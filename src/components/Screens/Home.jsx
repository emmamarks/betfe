import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Home({ history }) {

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/')
        }
    })

    const [input, setInput] = useState({
        description: "",
        amount: "",
        time: "",
    })
    const [error, setError] = useState("");
    const [username, setUsername] = useState('');
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
            
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }        
    }
    
    useEffect(() => {
        getUserProfile()
    }, [])

    

    async function handleSubmit(event) {
        event.preventDefault();
        if (input.description && finalAmount && input.time) {
            
        } else {
            return setError("Please fill all fields");
        }

        try {
            const registered = {
                description: input.description,
                amount: finalAmount,
                time: input.time
            };
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/create`,
                registered, config
            );
            history.push("/created");
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    function handleClick(){
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        history.push('/')
    }

    return(
        <div>
            <h1>
                Betty Cash
            </h1>
            <br />
            {error && <span>{error}</span>}<br /> <br />
            Welcome <Link>{username}</Link><br /> <br />
            Description: <input
                type="text"
                placeholder="Bet Description"
                name="description"
                onChange={handleChange}
                value={input.description}
            /><br /><br />
            Amount: <input
                type="text"
                placeholder="Enter Amount (₦)"
                name="amount"
                onChange={handleNumChange}
                value={new Intl.NumberFormat('en-NG', {
                }).format(finalAmount)}
            /><br /><br />
             Due Date/Time: <input
                type="date"
                name="time"
                onChange={handleChange}
                value={input.time}
            /><br /><br />
            <button onClick={(e) => handleSubmit(e)} className="btn">Create Bet</button> <br /> <br />
            <button onClick={(e) => handleClick()} className="btn">Logout</button>
        </div>
    );
}

export default withRouter(Home);