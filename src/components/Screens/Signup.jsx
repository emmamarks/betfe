import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Signup({ history }) {
  useEffect(() => {
    fetchBanks();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      history.push("/home");
    }
  }, [history]);

  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [bank, setBank] = useState({});

  const [input, setInput] = useState({
    bank: "",
    account: "",
    email: localStorage.getItem("email"),
    username: "",
    password: "",
    confirmPassword:'',
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
      setError("account number must contain 10 digits");
    } else {
      setError("");
    }
    if (input.account.length === 10) {
      resolveAccountNumber();
    } else setAccountName("");
  }, [input.account]);

  async function handleClick(event) {
    event.preventDefault();

    if (input.bank && input.account && input.username && input.password && input.confirmPassword) {

      if(typeof input.username !== 'undefined'){
        const re = /^\S*$/;
        if(input.username.length < 5 || !re.test(input.username)){
            return setError("Username must contain at least 5 characters")
        }
    }

    if(typeof input.password !== 'undefined'){
        if(input.password.length < 5){
            return setError("Password must contain at least 6 characters")
        }
    }

    if(input.password !== input.confirmPassword){
      return setError("Passwords do not match")
    }

      try {
        const registered = {
          account: input.account,
          email: localStorage.getItem("email"),
          bankCode: bank.code,
          bankId: bank.id,
          accountName,
          bankName: bank.name,
          username: input.username,
          password: input.password
        };

        const resp = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup`,
          registered
        );
        localStorage.setItem('authToken', resp.data.token)
        history.push("/home");
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
          <h1>Betty Cash</h1>
        {error && <span>{error}</span>}
        <br />
        <br />
        Bank:{" "}
        {/* <input type="text"
          list="bank"
          name="bank"
          autoComplete="on"
          placeholder="Choose Bank"
          value={text} onChange={onChange}
        />
        <datalist
          id="bank"
          name="bank"
          onChange={handleChange}
        >
          <select autocomplete="on" name="bank" onChange={handleChange}>
            {banks.map((bank) => (
              <option value={bank.name}>{bank.name}</option>
            ))}
          </select> 
        </datalist>
        <br /><br /> */}
        <select autocomplete="on" name="bank" onChange={handleChange}>
          {banks.map((bank) => (
            <option value={bank.code}>{bank.name}</option>
          ))}
        </select>
        <br /><br />
        Account Number:{" "}
        <input
          type="text"
          onKeyPress={validate}
          name="account"
          onChange={handleChange}
          value={input.account}
        />
        <br /> <br />
        Account Name: {accountName} <br /> <br />
        Username: <input
          type="text"
          placeholder="Choose Username"
          name="username"
          onChange={handleChange}
          value={input.username}
        /><br /><br />
        Password:<input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
          value={input.password}
        />
        <br /> <br />
        Confirm Password: <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={input.confirmPassword}
        />
        <br /> <br />
        <button onClick={(e) => handleClick(e)} className="btn">
          Register
        </button>
      </form>{" "}
      <br />
      <div>
        
      </div>
      <small>
        © Jacob 2023
      </small>
    </div>
  );
}

export default withRouter(Signup);
