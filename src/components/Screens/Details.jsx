import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');
    const [copySuccess, setCopySuccess] = useState(false)

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/details/${_id}`, config)
            setDescription(response.data.result.description)
            setTicket(response.data.result.ticket)
            setAmount(response.data.result.amount)
            setTime(response.data.result.time)
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        } 
      
    }
    const copyToClipBoard = async copyMe => {
        navigator.clipboard.writeText(copyMe);
        setCopySuccess('booking code copied');
    }
    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            Description: {description}<br /> <br />
            Amount: ₦{amount}<br /> <br />
            Due Date: {time} <br /> <br />
            Booking: {ticket}
            <button className="btn" onClick={() => copyToClipBoard(ticket)
                .then(() => {
                    setTimeout(() => {
                        const timeout = setTimeout(() => {
                            setCopySuccess(false)
                        }, 2000);
                        return () => clearTimeout(timeout);
                    })
                })
            }>
                copy
            </button><br /><br />
            <div id='green'>
                {copySuccess}
            </div>
        </div>
    )
}
export default withRouter (Details)