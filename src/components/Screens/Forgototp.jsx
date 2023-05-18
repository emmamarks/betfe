import { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Create({ history }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [input, setInput] = useState({ resetOtp: "" });
  const [showSubmitBtn, setShowSubmitBtn] = useState(true);

  const verifyOtp = async () => {
    const registered = {
      resetOtp: input.resetOtp,
      email: localStorage.getItem("email"),
    };
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/otp`,
        registered
      );
      setShowSubmitBtn(false);
      if (response.status === 200) {
        setError(response.data.message);
        setStatus("LOGIN");
      }
      history.push("/changepassword");
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
        {status === "LOGIN" && <Link to="/signup">Continue Registration</Link>}
        {status === "REGISTER" && <Link to="/send">Register</Link>}
      </p>
      {showSubmitBtn && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            name="resetOtp"
            value={input.resetOtp}
            onChange={handleChange}
          />
          <button onClick={(e) => handleClick(e)} className="btn">
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default withRouter (Create)