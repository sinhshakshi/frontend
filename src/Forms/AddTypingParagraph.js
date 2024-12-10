import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddTypingParagraph.css';

const AddTypingParagraph = () => {
  const [formData, setFormData] = useState({
    exam: '',
    examName: '',
    paper_code: '',
    testName: '', // New field for test name
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date here if necessary, e.g., converting to a specific format
    const formattedDate = new Date(formData.date).toISOString().split('T')[0]; // Change the format as needed

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addTypingParagraph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.myadmin}`,
      },
      body: JSON.stringify({ ...formData, date: formattedDate }), // Send the formatted date
    });

    if (response.ok) {
      toast.success('Typing paragraph added successfully');
      setFormData({
        exam: '',
        examName: '',
        paper_code: '',
        testName: '', // Reset test name field
        type: '',
        date: '',       
        title: '',
        paragraph: '',
        time: '',
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
      <form onSubmit={handleSubmit} className="typing-paragraph-form">
        {Object.entries(formData).map(([key, value]) => (
          <div className="typing-paragraph-form-group" key={key}>
            <label className="typing-paragraph-label" htmlFor={`${key}-typing`}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
            </label>
            {key === 'paragraph' ? (
              <textarea
                id={`${key}-typing`}
                className="typing-paragraph-textarea"
                name={key}
                value={value}
                onChange={handleChange}
                required
              />
            ) : key === 'date' ? (
              <input
                id={`${key}-typing`}
                className="typing-paragraph-input"
                type="date" // Custom date input
                name={key}
                value={value}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                id={`${key}-typing`}
                className="typing-paragraph-input"
                type={key === 'time' ? 'number' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="typing-paragraph-button">
          Add Typing Paragraph
        </button>
      </form>
    </>
  );
};

export default AddTypingParagraph;
