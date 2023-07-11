import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Home({ history }) {
    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/')
        }
    })

    const [isShown, setIsShown] = useState(false);
    const show = event => {
        setIsShown(current => !current);
    };
    function Box() {
        return (
          <div>
          </div>
        );
    }

    const [input, setInput] = useState({
        description: "",
        amount: "",
        time: "",
        ticket: ""
    })
    const [error, setError] = useState("");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [withdrawable, setWithdrawable] = useState('');
    const [finalAmount, setfinalAmount]= useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setInput((prevInput) => {
          return {
            ...prevInput,
            [name]: value,
          };
        });
    }

    const handleNumChange = (event) => {
        const str = (event.target.value).replace(/\,/g,'');
        setfinalAmount(str);
    }

    const authToken = localStorage.getItem('authToken');
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home`, config)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setId(response.data._id)
            localStorage.setItem('email', response.data.email);
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }
    }
    
    useEffect(() => {
        getUserProfile()
    }, [])

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

    async function handleSubmit(event) {
        event.preventDefault();
        if (input.description && finalAmount && input.time) {
        } else {
            return setError("Please fill all fields");
        }
        try {
            const registered = {
                description: input.description,
                amount: finalAmount * 100,
                time: input.time
            };
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/create`,
                registered, config
            );
            localStorage.setItem('amount', res.data.data.amount);
            history.push(`/pay/${res.data.data._id}`);
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    async function searchTicket(event){
        event.preventDefault();
        if (input.ticket) {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/ticket`,
                { ticket: input.ticket}
            )
            history.push(`/tickets/${res.data.data._id}`);
        } else {
            return setError("Enter Valid Bet Code");
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/ticket`,
                { ticket: input.ticket }, config
            );
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    async function showHistory(event) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home`, config)
            setId(response.data._id)
            history.push(`/profile/${response.data._id}`)
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    async function getUser(event) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home`, config)
            setId(response.data._id)
            history.push(`/profile/${response.data._id}`)
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    function handleClick(){
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        history.push('/')
    }

    useEffect(() => {
        const withdrawal = 0.95 * (finalAmount * 2)
        setWithdrawable(withdrawal.toFixed(2))
    }, [finalAmount])

    return(
        <div>
            <h1>
                Betty Cash
            </h1>
            <br />
            {error && <span>{error}</span>}<br /> <br />
            Welcome <Link onClick = {getUser}>{username}</Link><br /> <br />
            <form onSubmit={(e) => searchTicket(e)}>
                Bet Code: <input type="text" placeholder ="Caps Only"
                name="ticket" id="ticket" value={input.ticket} onChange={handleChange} />
                <button type="submit" className="btn">View Bet</button>
            </form><br />
            <label onClick={show} className="btn" htmlFor="">Create Bet</label> || 
            <label onClick={showHistory} className="btn" htmlFor="">Bet History</label><br /> <br />
            {isShown && (
                <div>
                    Description: <input
                        type="text"
                        placeholder="Bet Description"
                        name="description"
                        onChange={handleChange}
                        value={input.description}
                    /><br /><br />
                    Amount:₦<input
                        type="text"
                        onKeyPress={validate}
                        placeholder="Enter Amount (₦)"
                        name="amount"
                        onChange={handleNumChange}
                        value={new Intl.NumberFormat('en-NG', {
                        }).format(finalAmount)}
                    /><br /><br />
                    Withdrawable: <span id='green'>₦{withdrawable}</span> <br /> <br />
                    Due Date/Time: <input
                        type="date"
                        name="time"
                        onChange={handleChange}
                        value={input.time}
                    /><br /><br />
                    <button onClick={(e) => handleSubmit(e)} className="btn">Create Bet</button> <br /> <br />
                </div>
            )}
            {isShown && <Box />}
            <button onClick={(e) => handleClick()} className="btn">Logout</button>
        </div>
    );
}
export default withRouter(Home);