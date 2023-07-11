import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams  } from "react-router-dom";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setDate] = useState('');
    
    useEffect(() => {
        getPredictions()
    }, [])

    const authToken = localStorage.getItem('authToken');
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getPredictions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tickets/${_id}`, config)
            setPredictions(response.data.result)
            setDescription(response.data.result.description)
            setTicket(response.data.result.ticket)
            setAmount(response.data.result.amount)
            setDate(response.data.result.time)
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }        
    }
    
    async function handleSubmit(event) {

    }

    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            <br />
            Bet Description: {description}<br /> <br />
            Ticket: {ticket}<br /> <br />
            Amount: ₦{amount}<br /> <br />
            Due Date: {time}<br /> <br />
            <Link to = '/home'><button className="btn">Go Back</button></Link>
            <button onClick={(e) => handleSubmit(e)} className="btn">Accept Bet</button>
        </div>
    )
}
export default withRouter (Details)