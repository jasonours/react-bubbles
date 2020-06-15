import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', user)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page');
      })
      .catch(err => {
        console.log(err)
      })
  }
  
	return (
		<div className="LoginForm">
			<h2>Color Bubbles!!!</h2>
			<form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username"
          value={user.username} 
          onChange={handleChange} />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={user.password} 
          onChange={handleChange} />
				<button>Login</button>
			</form>

		</div>
	);
};

export default Login;