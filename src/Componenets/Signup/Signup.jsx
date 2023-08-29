import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './signup.scss'

function SignUp() {
  // const [signIn, setSigIn] = useState(true);
  // let signInBtn = `toggle-btn ${signIn ? ' active' : ''}`
  // let logInBtn = `toggle-btn ${!signIn ? ' active' : ''}`
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue)
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    console.log("submit")
    e.preventDefault();
    try {
      const { data } = await axios({
        method: 'post',
        url: "http://localhost:4000/signup",
        data: {
          email: inputValue.email,
          username: inputValue.username,
          password: inputValue.password
        },
        withCredentials: true,
        mode: 'no-cors',
      }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>SignUp Account</h2>
        <div className="signin">
          <form onSubmit={handleSubmit}>
            <div className="field-wrap">
              <label htmlFor="username">
                Username
              </label>
              <input type="text" name="username" value={username} onChange={handleOnChange} placeholder="Enter your Username" required />
            </div>

            <div className="field-wrap">
              <label htmlFor="email">
                Email Address
              </label>
              <input type="email" name="email" value={email} onChange={handleOnChange} placeholder="Enter your email" required />
            </div>

            <div className="field-wrap">
              <label htmlFor="password">
                Password
              </label>
              <input type="password" name="password" value={password} onChange={handleOnChange} placeholder="Enter your password" required />
            </div>
            <button className="submit"type="submit">SignIn</button>
            <div>
              Already have an account? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default SignUp;