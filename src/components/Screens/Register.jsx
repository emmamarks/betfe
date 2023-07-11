<<<<<<< HEAD
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function Send({ history }) {
  const [input, setInput] = useState({
    email: "",
  });
  const [isBtnEnabled, setBtnEnabled] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
    if (typeof input.email !== "undefined") {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(input.email)) {
        return setError("Please, provide a valid email");
      }
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send`, {
        email: input.email,
      });
      localStorage.setItem("email", input.email);
      history.push("/confirm");
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
        setStatus("LOGIN");;
      }
      return setError(error.response.data.error);
    }
  }

  return (
    <div>
      <form>
        <Link to="/">
          <h1>Welcome to Betty Cash</h1>
        </Link>
        {error && <span>{error}</span>}
        <br />
        <p>
        {status === "LOGIN" && <Link to="/">Register/Login</Link>}
        </p>
        Email:{" "}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={input.email}
        />
        <br /> <br />
        <button disabled className="btn">
          Register
        </button>
        <button onClick={(e) => handleClick(e)} className="btn">
          Get OTP
        </button>
        <br /> <br />
        <Link to="/">
          <button className="btn">Log In</button>
        </Link>
      </form>{" "}
      <br /> <br />
      <small>
        <Link to="/">Home</Link>| AboutUs| info@cbt.com| 08133050899| 13, Ikate,
        Lekki Phase I, Lagos, Nigeria| FAQ| Privacy Policy| Terms of Service| ©
        Jacob 2023
      </small>
    </div>
  );
}

export default withRouter(Send);
=======
<<<<<<< HEAD
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function Send({ history }) {
  const [input, setInput] = useState({
    email: "",
  });
  const [isBtnEnabled, setBtnEnabled] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
    if (typeof input.email !== "undefined") {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(input.email)) {
        return setError("Please, provide a valid email");
      }
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send`, {
        email: input.email,
      });
      localStorage.setItem("email", input.email);
      history.push("/confirm");
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
        setStatus("LOGIN");;
      }
      return setError(error.response.data.error);
    }
  }

  return (
    <div>
      <form>
        <Link to="/">
          <h1>Welcome to Betty Cash</h1>
        </Link>
        {error && <span>{error}</span>}
        <br />
        <p>
        {status === "LOGIN" && <Link to="/">Register/Login</Link>}
        </p>
        Email:{" "}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={input.email}
        />
        <br /> <br />
        <button disabled className="btn">
          Register
        </button>
        <button onClick={(e) => handleClick(e)} className="btn">
          Get OTP
        </button>
        <br /> <br />
        <Link to="/">
          <button className="btn">Log In</button>
        </Link>
      </form>{" "}
      <br /> <br />
      <small>
        <Link to="/">Home</Link>| AboutUs| info@cbt.com| 08133050899| 13, Ikate,
        Lekki Phase I, Lagos, Nigeria| FAQ| Privacy Policy| Terms of Service| ©
        Jacob 2023
      </small>
    </div>
  );
}

export default withRouter(Send);
=======
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function Send({ history }) {
  const [input, setInput] = useState({
    email: "",
  });
  const [isBtnEnabled, setBtnEnabled] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
    if (typeof input.email !== "undefined") {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(input.email)) {
        return setError("Please, provide a valid email");
      }
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send`, {
        email: input.email,
      });
      localStorage.setItem("email", input.email);
      history.push("/confirm");
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
        setStatus("LOGIN");;
      }
      return setError(error.response.data.error);
    }
  }

  return (
    <div>
      <form>
        <Link to="/">
          <h1>Welcome to Betty Cash</h1>
        </Link>
        {error && <span>{error}</span>}
        <br />
        <p>
        {status === "LOGIN" && <Link to="/">Register/Login</Link>}
        </p>
        Email:{" "}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={input.email}
        />
        <br /> <br />
        <button disabled className="btn">
          Register
        </button>
        <button onClick={(e) => handleClick(e)} className="btn">
          Get OTP
        </button>
        <br /> <br />
        <Link to="/">
          <button className="btn">Log In</button>
        </Link>
      </form>{" "}
      <br /> <br />
      <small>
        <Link to="/">Home</Link>| AboutUs| info@cbt.com| 08133050899| 13, Ikate,
        Lekki Phase I, Lagos, Nigeria| FAQ| Privacy Policy| Terms of Service| ©
        Jacob 2023
      </small>
    </div>
  );
}

export default withRouter(Send);
>>>>>>> 67be86bc90a6d90afe4cb1a7bcae895cc9bb5574
>>>>>>> cc381b892c93892bec67ebf8aef4d74c2bee83ad
