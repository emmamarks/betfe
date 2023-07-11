<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');

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

    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            <br />
            {description}   ||  {ticket}   ||   ₦{amount}   ||   {time}
        </div>
    )
}

=======
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');

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

    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            <br />
            {description}   ||  {ticket}   ||   ₦{amount}   ||   {time}
        </div>
    )
}

=======
import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');

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

    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            <br />
            {description}   ||  {ticket}   ||   ₦{amount}   ||   {time}
        </div>
    )
}

>>>>>>> 67be86bc90a6d90afe4cb1a7bcae895cc9bb5574
>>>>>>> cc381b892c93892bec67ebf8aef4d74c2bee83ad
export default withRouter (Details)