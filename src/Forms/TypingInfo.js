import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./TypingInfo.css"; // Import CSS file

const TypingInfo = () => {
  const [formData, setFormData] = useState({
    metaTag: "",
    examName: "",
    image: null,
    introduction: "",
    paramLink: "",
    category: "",
    youtubeVideoLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/typing-info`, {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data saved successfully!",
        });

        // Clear form inputs
        setFormData({
          metaTag: "",
          examName: "",
          image: null,
          introduction: "",
          paramLink: "",
          category: "",
          youtubeVideoLink: "",
        });

        // Clear file input
        document.querySelector('input[type="file"]').value = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving the data. Please try again.",
      });
    }
  };

  return (
    <div className="typingInfo-container">
      <h2 className="typingInfo-title">Typing Info Form</h2>
      <form className="typingInfo-form" onSubmit={handleSubmit}>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Meta Tag:</label>
          <input
            className="typingInfo-input"
            type="text"
            name="metaTag"
            value={formData.metaTag}
            onChange={handleChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Exam Name:</label>
          <input
            className="typingInfo-input"
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Image:</label>
          <input
            className="typingInfo-input"
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Introduction:</label>
          <textarea
            className="typingInfo-textarea"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Param Link:</label>
          <input
            className="typingInfo-input"
            type="text"
            name="paramLink"
            value={formData.paramLink}
            onChange={handleChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">Category:</label>
          <input
            className="typingInfo-input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="typingInfo-field">
          <label className="typingInfo-label">YouTube Video Link:</label>
          <input
            className="typingInfo-input"
            type="text"
            name="youtubeVideoLink"
            value={formData.youtubeVideoLink}
            onChange={handleChange}
          />
        </div>
        <button className="typingInfo-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TypingInfo;
