import { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Create({ history }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [showSubmitBtn, setShowSubmitBtn] = useState(true);
  const [input, setInput] = useState({
    password: "secret",
    confirmPassword: "secret",
    resetOtp: "",
  });

  const verifyOtp = async () => {
    const registered = {
      resetOtp: input.resetOtp,
      password: input.password,
    };
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/reset`,
        registered
      );
      setShowSubmitBtn(false);
      if (response.status === 200) {
        //setError(response.data.message);
        setStatus("LOGIN");
      }
      //history.push("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
          return;
        }
        if (error.response.data) {
          if (
            error.response.data.message ==
            "otp has expired. Please request a new otp"
          ) {
            setInput({ resetOtp: "" });
            setShowSubmitBtn(false);
          }
          setError(error.response.data.message);
          setUser(error.response.data.data);
        }
      } else {
        setError(error.message);
      }
    }
  };

  const resendToken = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!user || (user && !user.email)) {
        setError("User does not have a valid email");
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resendotp`,
        { email: user.email }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);
        setShowSubmitBtn(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handleClick(event) {
    event.preventDefault();

    if(input.resetOtp && input.password && input.confirmPassword){
      if(typeof input.password !== 'undefined'){
        if(input.password.length < 5){
            return setError("Password must contain at least 6 characters")
        }
      }
  
      if(input.password !== input.confirmPassword){
        return setError("Passwords do not match")
      }
  
      if (input.resetOtp) {
        if (typeof input.resetOtp !== "undefined") {
          const re = /^\d{4}$/;
          if (!re.test(input.resetOtp)) {
            return setError("check email for otp");
          }
        }
        verifyOtp();
      } else {
        return setError("enter otp sent to mail");
      }
    }else{
      return setError("Please enter all fields")
    }
  }

  return (
    <div>
      <h3> Account Verification</h3>
      {error && (
        <div>
          <p>
            <span>{error}</span>
          </p>
          {user && (
            <button className="btn" onClick={(e) => resendToken(e)}>
              Resend
            </button>
          )}
        </div>
      )}
      {success && <span>{success}</span>}
      <p>
        {status === "LOGIN" && <Link to="/">Login</Link>}
      </p>
      {showSubmitBtn && (
        <>
            New Password:<input
            type="password"
            placeholder="Enter New Password"
            name="password"
            onChange={handleChange}
            value={input.password}
          />
          <br /> <br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmPassword"
            onChange={handleChange}
            value={input.confirmPassword}
          />
          <br /> <br />
          Enter OTP:<input
            type="text"
            placeholder="Enter OTP"
            name="resetOtp"
            value={input.resetOtp}
            onChange={handleChange}
          /><br /><br />
          <button onClick={(e) => handleClick(e)} className="btn">
            Change Password
          </button>
        </>
      )}
    </div>
  );
}

export default withRouter (Create)