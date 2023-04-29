import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function Signup({ history }) {
  useEffect(() => {
    fetchBanks();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      history.push("/forum");
    }
  }, [history]);

  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState({});

  const [input, setInput] = useState({
    bank: "",
    account: "",
    email: localStorage.getItem("email"),
    password: ""
  });

  const [error, setError] = useState("");

  async function fetchBanks() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/banks`
      );
      setBanks(response.data.data);
    } catch (error) {}
  }

  async function resolveAccountNumber() {
    setAccountName("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resolve-account-number`,
        { accountNumber: input.account, bankCode: input.bank }
      );
      setAccountName(response.data.data.account_name);
      const bank = banks.find((data) => data.id === response.data.data.bank_id);
      setBank(bank);
    } catch (error) {}
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "account" && value && value.length > 10) return;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (input.account.length != 10) {
      setError("account must contain 10 digits");
    } else {
      setError("");
    }
    if (input.account.length === 10) {
      resolveAccountNumber();
    } else setAccountName("");
  }, [input.account]);

  async function handleClick(event) {
    event.preventDefault();

    if (input.bank && input.account) {
      try {
        const registered = {
          account: input.account,
          email: localStorage.getItem("email"),
          bankCode: bank.code,
          bankId: bank.id,
          accountName,
          bankName: bank.name,
          password: input.password
        };

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup`,
          registered
        );

        history.push("/");
      } catch (error) {
        setError(error.response.data.error);
      }
    } else {
      return setError("Please fill all fields");
    }
  }

  function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = theEvent.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
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
        <br />
        Bank:{" "}
        <select autocomplete="on" name="bank" onChange={handleChange}>
          {banks.map((bank) => (
            <option value={bank.code}>{bank.name}</option>
          ))}
        </select>
        <br /> <br />
        Account Number:{" "}
        <input
          type="text"
          placeholder="Choose account"
          onKeyPress={validate}
          name="account"
          onChange={handleChange}
          value={input.account}
        />
        <br /> <br />
        Account Name: {accountName} <br /> <br />
        <input
          type="text"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={input.password}
        />
        <br /> <br />
        <Link to="/">
          <button className="btn">Go Back</button>
        </Link>
        <button onClick={(e) => handleClick(e)} className="btn">
          Register
        </button>
      </form>{" "}
      <br /> <br />
      <small>
        <Link to="/">Home</Link>| AboutUs| info@cbt.com| 08133050899| 13, Ikate,
        Lekki Phase I, Lagos, Nigeria| FAQ| Privacy Policy| Terms of Service| ©
        Jacob 2021
      </small>
    </div>
  );
}

export default withRouter(Signup);
