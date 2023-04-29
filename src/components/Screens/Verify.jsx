import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, withRouter } from "react-router-dom";

function Verify({ history }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  
  const params = useParams();
  useEffect(() => {
    verifyToken();
  }, []);
  
  const verifyToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify/${params.confirmToken}`
      );
      if (response.status === 200) {
        setSuccess(response.data.message);
        setStatus("LOGIN");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError(error.response.data.message);
          setStatus("REGISTER");
          return;
        }
        if (error.response.data) {
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
    try {
      if (!user || (user && !user.email)) {
        setError("User does not have a valid email");
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resend-link`,
        { email: user.email }
      );
      if (response.status === 200) {
        setSuccess(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h3> Account Verification</h3>
      {error && (
        <div>
          <p>
            <span>{error}</span>
          </p>
          {user && <button className="btn" onClick={(e) => resendToken(e)}>Resend</button>}
        </div>
      )}
      {success && <span>{success}</span>}
      <p>
        {status === "LOGIN" && <Link to="/">Login</Link>}
        {status === "REGISTER" && <Link to="/signup">Sign Up</Link>}
      </p>
    </div>
  );
}

export default withRouter(Verify);
