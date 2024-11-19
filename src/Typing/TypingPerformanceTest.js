import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import parse from "html-react-parser";

import { useCookies } from 'react-cookie';

const TypingPerformanceTest = () => { 
    const { accuracy, wrongper, actualdep, speed, testcode, exam, category } = useParams();
    const [paragraph, setParagraph] = useState('');
    const [studentparagraph, setStudentParagraph] = useState('');
    const [origionalparagraph, setOrigionalParagraph] = useState('');
    const [wrongdep, setWrongdep] = useState('');
    const [grosspeed, setGrossSpeed] = useState('');
    const [wpm, setWpm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [cookies] = useCookies(); 

    let tracc = Math.round(accuracy * 3.6);
    let trwro = Math.round(wrongper * 3.6);    
    let tract = Math.round(actualdep * 3.6);  
    let trspe = Math.round(speed * 3.6);

    let colr, testresult;
    if (wrongper < error) { 
        colr = '#1cff1c';             
        testresult = 'Pass';     
    } else {            
        colr = '#ff7a7a';   
        testresult = 'Fail';
    }

    useEffect(() => {
        const fetchPerformanceStatusTest = async () => {
            let dt = { paper_code: testcode, email_id: cookies.SSIDCE, exam: exam, category: category };
            let state_res = await fetch(`${process.env.REACT_APP_API_URL}/api/typingPerformanceStatusTest`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dt)
            });

            if (state_res.ok) {
                state_res = await state_res.json();
                setParagraph(parse(state_res.paragraph));
                setOrigionalParagraph(parse(state_res.origional_paragraph));
                setStudentParagraph(parse(state_res.student_paragraph));
                setGrossSpeed(state_res.grossspeed);
                setWrongdep(state_res.wrongdep);
                setWpm(state_res.wpm);
                setError(state_res.error);
            } else {
                console.error("Failed to fetch performance status test", state_res.statusText);
            }
        };

        fetchPerformanceStatusTest();
    }, [testcode, cookies.SSIDCE, exam, category]);

    const startTest = () => {
        navigate(`/typingparagraph/${exam}/${category}`);
    };

    return (             
        <>                 
            <Row className="tp-fr tp-fr1">
                <Col md={12} className="tp-fr-col12">
                  <p className="tp-fr-col12p">{cookies.SSIDCE}</p>
                  <p className="tp-fr-col12p1">
                      <span className="tp-fr-col12p1-span1">SSC TYPING RESULT: </span>
                      {testresult === 'Pass' ? 
                          <span className="tp-fr-col12p1-span2" style={{color: '#1cff1c'}}>Pass</span> : 
                          <span className="tp-fr-col12p1-span2" style={{color: '#ff7a7a'}}>TRY AGAIN</span>
                      }
                  </p>
                </Col>
            </Row>   
            <Row className="tp-fr2">               
                <Col md={2}>   
                    <Col className="c100 coloracuracy p90 blue">          
                        <span>{accuracy}%</span>    
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>            
                        </Col>  
                    </Col>
                    <h3 className="text-align-center">Accuracy</h3>
                </Col>      
                <Col md={2}>         
                    <Col className="c100 colorspeed p90 blue">
                        <span>{speed}</span>
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>
                        </Col>          
                    </Col>
                    <h3 className="text-align-center">Net Speed (WPM)</h3>
                </Col>
                <Col md={2}>
                    <Col className="c100 colorspeed p90 blue">
                        <span>{grosspeed}</span>
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>
                        </Col>             
                    </Col>
                    <h3 className="text-align-center">Gross Speed (WPM)</h3>
                </Col>
                <Col md={2}>
                    <Col className="c100 colorspeed p90 blue">
                        <span>{wrongdep}</span>   
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>
                        </Col>          
                    </Col>
                    <h3 className="text-align-center">Wrong (Depressions)</h3>
                </Col>
                <Col md={2}>
                    <Col className="c100 colorwrong p90 blue">            
                        <span>{wrongper}%</span>
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>
                        </Col>                
                    </Col>
                    <h3 className="text-align-center">Error</h3>
                </Col>
                <Col md={2}>     
                    <Col className="c100 coloractual p90 blue">         
                        <span>{actualdep}</span>
                        <Col className="slice">
                            <Col className="bar" style={{transform: 'rotate(360deg)'}}></Col>
                            <Col className="fill"></Col>
                        </Col>
                    </Col>
                    <h3 className="text-align-center">Actual Depressions</h3>
                </Col>  
            </Row>
            <Row className="tp-fr3">      
                <Col md={12} className="tp-paragrah-col">       
                    {origionalparagraph}
                </Col>
            </Row>
            <Row className="tp-fr3">      
                <Col md={12} className="tp-paragrah-col">       
                    {studentparagraph}
                </Col>
            </Row>
            <Row className="tp-fr3">      
                <Col md={12} className="tp-paragrah-col">       
                    {paragraph}
                </Col>
            </Row>
            <Row className="tp-fr4">
                <Col md={12} className="tp-paragrah-col">       
                    <Button className="tt-fth-rcol4-div-submit-button" onClick={startTest}>Back to Dashboard</Button>
                </Col>
            </Row>
        </>
    );
};

export default TypingPerformanceTest;
