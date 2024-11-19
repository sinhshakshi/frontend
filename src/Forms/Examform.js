import React, { useState } from 'react';
import './ExamForm.css';
import ReactQuill from 'react-quill'; // Import react-quill
import 'react-quill/dist/quill.snow.css'; // Import quill styles for the editor
import Swal from 'sweetalert2'; // Import SweetAlert2

const ExamForm = () => {
  const [examName, setExamName] = useState('');
  const [image, setImage] = useState(null);
  const [introduction, setIntroduction] = useState(''); // Add state for introduction text

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('govName', examName);
    formData.append('image', image);
    formData.append('introduction', introduction); // Append the introduction to the formData

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/exams-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Exam added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        console.log(result);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error adding exam.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="examname-container">
      <h2 className="examname-heading">Add Exams and Image</h2>
      <form className="examname-form" onSubmit={handleSubmit}>
        <div>
          <label className="examname-label">Exam Name:</label>
          <input
            type="text"
            className="examname-input"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="examname-label">Exam Image:</label>
          <input
            type="file"
            className="examname-file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="examname-label">Introduction:</label>
          {/* React Quill Text Editor */}
          <ReactQuill
            value={introduction}
            onChange={setIntroduction} // Update state when content changes
            placeholder="Write the introduction here..."
            theme="snow" // Use the "snow" theme for a clean appearance
            required
          />
        </div>

        <button type="submit" className="examname-button">Submit</button>
      </form>
    </div>
  );
};

export default ExamForm;
