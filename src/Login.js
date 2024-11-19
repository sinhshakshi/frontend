import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['session_id']);
  const navigate = useNavigate();

  const handleEmailId = (event) => {
    setEmailId(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email_id: emailId, password })
    });

    if (response.ok) {
      const { message, session_id } = await response.json();
      alert(message);
      setCookie("session_id", session_id, { path: "/", maxAge: 24 * 60 * 60 });
      navigate(`/typingexamselection`);
    } else {
      const { message } = await response.json();
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Login</h5>
      <input type="text" value={emailId} onChange={handleEmailId} placeholder="Email" required />
      <input type="password" value={password} onChange={handlePassword} placeholder="Password" required />
      <input type="submit" value="Sign In" />
    </form>
  );
};

export default Login;
