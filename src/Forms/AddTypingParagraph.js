// import React, { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './AddTypingParagraph.css';

// const AddTypingParagraph = () => {
//   const [formData, setFormData] = useState({
//     exam: '',
//     examName: '',
//     paper_code: '',
//     testName: '', // New field for test name
//     title: '',
//     date: '',
//     time: '',
//     type: '',
//     paragraph: '',
//     status: '1',
//   });

//   const [cookies] = useCookies(['myadmin']);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Format the date here if necessary, e.g., converting to a specific format
//     const formattedDate = new Date(formData.date).toISOString().split('T')[0]; // Change the format as needed

//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addTypingParagraph`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookies.myadmin}`,
//       },
//       body: JSON.stringify({ ...formData, date: formattedDate }), // Send the formatted date
//     });

//     if (response.ok) {
//       toast.success('Typing paragraph added successfully');
//       setFormData({
//         exam: '',
//         examName: '',
//         paper_code: '',
//         testName: '', // Reset test name field
//         type: '',
//         date: '',       
//         title: '',
//         paragraph: '',
//         time: '',
//         status: '1',
//       });
//     } else {
//       toast.error('Failed to add typing paragraph');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <h1 className="add-ebook-form">Add Typing Content</h1>
//       <form onSubmit={handleSubmit} className="typing-paragraph-form">
//         {Object.entries(formData).map(([key, value]) => (
//           <div className="typing-paragraph-form-group" key={key}>
//             <label className="typing-paragraph-label" htmlFor={`${key}-typing`}>
//               {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
//             </label>
//             {key === 'paragraph' ? (
//               <textarea
//                 id={`${key}-typing`}
//                 className="typing-paragraph-textarea"
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 required
//               />
//             ) : key === 'date' ? (
//               <input
//                 id={`${key}-typing`}
//                 className="typing-paragraph-input"
//                 type="date" // Custom date input
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 required
//               />
//             ) : (
//               <input
//                 id={`${key}-typing`}
//                 className="typing-paragraph-input"
//                 type={key === 'time' ? 'number' : 'text'}
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 required
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit" className="typing-paragraph-button">
//           Add Typing Paragraph
//         </button>
//       </form>
//     </>
//   );
// };

// export default AddTypingParagraph;


import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddTypingParagraph.css';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from '@mui/material';
import './AddTypingParagraph.css';

const AddTypingParagraph = () => {
  const examData = {
    SSC: {
      examNames: {
        CHSL: ['CHSL24-ENG-TYP01'],
        CGL: ['CGL24-ENG-TYP01'],
      },
    },
    DSSSB: {
      examNames: {
        'JSA-LDC-PA-JJA English': ['DSSSB-ENG-01'],
        'JSA-LDC-PA-JJA Hindi': ['DSSSB-HIN-01'],
      },
    },
    RRB: {
      examNames: {
        'NTPC Hindi': ['RRB-TYPING-HIN-01'],
        'NTPC English': ['RRB-TYPING-ENG-01'],
      },
    },
    'Supreme Court': {
      examNames: {
        JCA: ['SC-JCA-TYPING-01'],
      },
    },
    'Delhi Police': {
      examNames: {
        'AWO-TPO English': ['DELHI-POLICE-TYPING-ENG-01'],
        'AWO-TPO Hindi': ['DELHI-POLICE-TYPING-HIN-01'],
      },
    },
    'Delhi High Court': {
      examNames: {
        'SPA-PA': ['DHC-SPA-PA-01'],
      },
    },
    DRDO: {
      examNames: {
        'Admin Assistant English': ['DRDO-TYPING-ENG-01'],
        'Stenographer English': ['DRDO-STENO-ENG-01'],
      },
    },
    EPFO: {
      examNames: {
        'Social Security Assistant English': ['EPFO-TYPING-ENG-01'],
        'Stenographer English': ['EPFO-STENO-ENG-01'],
      },
    },
    BSF: {
      examNames: {
        HCM: ['BSF-TYPING-ENG-01'],
        'Stenographer English': ['BSF-STENO-ENG-01'],
      },
    },
  };
  
  
  

  const [formData, setFormData] = useState({
    exam: '',
    examName: '',
    paper_code: '',
    testName: '',
    title: '',
    date: '',
    time: '',
    type: '',
    paragraph: '',
    status: '1',
  });

  const [cookies] = useCookies(['myadmin']);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExamChange = (e) => {
    setFormData({
      ...formData,
      exam: e.target.value,
      examName: '',
      paper_code: '',
    });
  };

  const handleExamNameChange = (e) => {
    setFormData({
      ...formData,
      examName: e.target.value,
      paper_code: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(formData.date).toISOString().split('T')[0];

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addTypingParagraph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.myadmin}`,
      },
      body: JSON.stringify({ ...formData, date: formattedDate }),
    });

    if (response.ok) {
      toast.success('Typing paragraph added successfully');
      setFormData({
        exam: '',
        examName: '',
        paper_code: '',
        testName: '',
        title: '',
        date: '',
        time: '',
        type: '',
        paragraph: '',
        status: '1',
      });
    } else {
      toast.error('Failed to add typing paragraph');
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="add-ebook-form">Add Typing Content</h1>
      <form className="add-ebook-form-add" onSubmit={handleSubmit}>
        <FormControl className="typing-paragraph-input" fullWidth margin="normal">
          <InputLabel id="exam-label">Exam</InputLabel>
          <Select
            labelId="exam-label"
            id="exam"
            name="exam"
            value={formData.exam}
            onChange={handleExamChange}
            required
          >
            <MenuItem value="">
              <em>Select Exam</em>
            </MenuItem>
            {Object.keys(examData).map((exam) => (
              <MenuItem key={exam} value={exam}>
                {exam}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {formData.exam && (
          <FormControl className="typing-paragraph-input" fullWidth margin="normal">
            <InputLabel id="examName-label">Exam Name</InputLabel>
            <Select
              labelId="examName-label"
              id="examName"
              name="examName"
              value={formData.examName}
              onChange={handleExamNameChange}
              required
            >
              <MenuItem value="">
                <em>Select Exam Name</em>
              </MenuItem>
              {Object.keys(examData[formData.exam]?.examNames || {}).map((examName) => (
                <MenuItem key={examName} value={examName}>
                  {examName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {formData.examName && (
          <FormControl className="typing-paragraph-input" fullWidth margin="normal">
            <InputLabel id="paper_code-label">Paper Code</InputLabel>
            <Select
              labelId="paper_code-label"
              id="paper_code"
              name="paper_code"
              value={formData.paper_code}
              onChange={handleChange}
              required
            >
              <MenuItem value="">
                <em>Select Paper Code</em>
              </MenuItem>
              {(examData[formData.exam]?.examNames[formData.examName] || []).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          fullWidth
          margin="normal"
          id="testName"
          label="Test Name"
          name="testName"
          value={formData.testName}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="title"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="date"
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          id="time"
          label="Time"
          type="number"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <FormControl className="typing-paragraph-input" fullWidth margin="normal">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="Previous">Previous</MenuItem>
            <MenuItem value="New">New</MenuItem>
          </Select>
        </FormControl>

        <textarea
  id="paragraph"
  className="typing-paragraph-textarea"
  name="paragraph" // Corrected 'name' property
  value={formData.paragraph} // Accessing 'paragraph' from formData
  onChange={handleChange} // Change handler remains same
  required
/>


        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: '#6a11cb', '&:hover': { backgroundColor: '#2575fc' } }}
        >
          Add Typing Paragraph
        </Button>
      </form>
    </>
  );
};



export default AddTypingParagraph;
