import React, { useState } from "react";
import Swal from "sweetalert2";
import { TextField, Button, Box, Typography } from "@mui/material";

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

  const [imageName, setImageName] = useState(""); // State for showing uploaded image name

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImageName(file ? file.name : ""); // Update the image name state
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
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data saved successfully!",
        });

        setFormData({
          metaTag: "",
          examName: "",
          image: null,
          introduction: "",
          paramLink: "",
          category: "",
          youtubeVideoLink: "",
        });

        setImageName(""); // Clear the image name
        document.querySelector('input[type="file"]').value = ""; // Clear file input
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          marginBottom={3}
          sx={{ fontWeight: "bold", color: "#4a4a4a" }}
        >
          Typing Info Form
        </Typography>

        <TextField
          fullWidth
          label="Meta Tag"
          name="metaTag"
          value={formData.metaTag}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="Exam Name"
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <Button
          variant="contained"
          component="label"
          sx={{ marginY: 2, backgroundColor: "#6a11cb", "&:hover": { backgroundColor: "#2575fc" } }}
        >
          Upload Image
          <input
            type="file"
            hidden
            name="image"
            onChange={handleFileChange}
            required
          />
        </Button>

        {imageName && (
          <Typography
            variant="body2"
            sx={{ marginBottom: 2, color: "#4a4a4a" }}
          >
            Uploaded File: <strong>{imageName}</strong>
          </Typography>
        )}

        <TextField
          fullWidth
          label="Introduction"
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
        />

        <TextField
          fullWidth
          label="Param Link"
          name="paramLink"
          value={formData.paramLink}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          fullWidth
          label="YouTube Video Link"
          name="youtubeVideoLink"
          value={formData.youtubeVideoLink}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            marginTop: 3,
            padding: 1,
            backgroundColor: "#6a11cb",
            "&:hover": { backgroundColor: "#2575fc" },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TypingInfo;
