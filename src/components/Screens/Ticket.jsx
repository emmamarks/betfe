<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams  } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setDate] = useState('');
    
    const [config, setConfig] = useState({
		email: localStorage.getItem("email"),
		amount: localStorage.getItem("amount"),
		//publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
		publicKey: "pk_test_21b3d8241a4c462ac7c90a284ddeb37cdab27b69"
	});

	const initializePayment = usePaystackPayment(config);


	function onSuccess () {
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/accept`, {
                email: localStorage.getItem('email'),
            });
        } catch (error) {
			setError(error.response.data.error);            
        }
		try {
			const res = axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/accepted`,
            );
		} catch (error) {
			setError(error.response.data.error);
		}
		const timeout = setTimeout(() => {
			// 👇️ redirects to an external URL
			window.location.replace('http://localhost:3000/');
		  }, 3000);
	  
		return () => clearTimeout(timeout);
	};

	const onClose = () => {
		alert("Oops, Payment not completed");
	};
	const handleClick = (e) => {
		initializePayment(onSuccess, onClose);
	};

    useEffect(() => {
        getPredictions()
    }, [])

    const authToken = localStorage.getItem('authToken');
    const confi = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getPredictions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tickets/${_id}`, confi)
            setPredictions(response.data.result)
            setDescription(response.data.result.description)
            setTicket(response.data.result.ticket)
            setAmount(response.data.result.amount)
            setDate(response.data.result.time)
            localStorage.setItem('amount', response.data.result.amount);
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
            Bet Description: {description}<br /> <br />
            Ticket: {ticket}<br /> <br />
            Amount: ₦{amount}<br /> <br />
            Due Date: {time}<br /> <br />
            <Link to = '/home'><button className="btn">Go Back</button></Link>
            <button onClick={(e) => handleClick(e)} className="btn">Accept Bet</button>
        </div>
    )
}
=======
import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams  } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import axios from 'axios';

function Details ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [description, setDescription] = useState('');
    const [ticket, setTicket] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setDate] = useState('');
    
    const [config, setConfig] = useState({
		email: localStorage.getItem("email"),
		amount: localStorage.getItem("amount"),
		//publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
		publicKey: "pk_test_21b3d8241a4c462ac7c90a284ddeb37cdab27b69"
	});

	const initializePayment = usePaystackPayment(config);


	function onSuccess () {
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/accept`, {
                email: localStorage.getItem('email'),
            });
        } catch (error) {
			setError(error.response.data.error);            
        }
		try {
			const res = axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/accepted`,
            );
		} catch (error) {
			setError(error.response.data.error);
		}
		const timeout = setTimeout(() => {
			// 👇️ redirects to an external URL
			window.location.replace('http://localhost:3000/');
		  }, 3000);
	  
		return () => clearTimeout(timeout);
	};

	const onClose = () => {
		alert("Oops, Payment not completed");
	};
	const handleClick = (e) => {
		initializePayment(onSuccess, onClose);
	};

    useEffect(() => {
        getPredictions()
    }, [])

    const authToken = localStorage.getItem('authToken');
    const confi = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getPredictions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tickets/${_id}`, confi)
            setPredictions(response.data.result)
            setDescription(response.data.result.description)
            setTicket(response.data.result.ticket)
            setAmount(response.data.result.amount)
            setDate(response.data.result.time)
            localStorage.setItem('amount', response.data.result.amount);
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
            Bet Description: {description}<br /> <br />
            Ticket: {ticket}<br /> <br />
            Amount: ₦{amount}<br /> <br />
            Due Date: {time}<br /> <br />
            <Link to = '/home'><button className="btn">Go Back</button></Link>
            <button onClick={(e) => handleClick(e)} className="btn">Accept Bet</button>
        </div>
    )
}
>>>>>>> cc381b892c93892bec67ebf8aef4d74c2bee83ad
export default withRouter (Details)