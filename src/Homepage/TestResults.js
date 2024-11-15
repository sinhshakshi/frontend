import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

const TestResults = () => {
  const results = [
    { name: "John Doe", result: "95%", image: "/path-to-image1.jpg", examLink: "/exam1" },
    { name: "Jane Smith", result: "88%", image: "/path-to-image2.jpg", examLink: "/exam2" },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Recent Typing Test Results</h2>
      <Row>
        {results.map((result, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="mb-4 shadow-sm">
              <Card.Img variant="top" src={result.image} />
              <Card.Body>
                <Card.Title>{result.name}</Card.Title>
                <Card.Text>Accuracy: {result.result}</Card.Text>
                <a href={result.examLink} className="btn btn-primary">View Exam</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestResults;
