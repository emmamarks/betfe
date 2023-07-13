import React, { useRef, useState, useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import axios from 'axios';

function Created ({ history }) {
    const {_id} = useParams();
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [ticket, setTicket] = useState("");
    const [id, setId] = useState('');

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hits`, config)
            setPredictions(response.data.result)
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
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

    return(
        <div>
            <Link to = '/home'>
                <h1>
                    Betty Cash
                </h1>
            </Link>
            {predictions.map((prediction, index) =>{
                return(
                    <div key={index}>
                        <Link onClick = {getUser}>{prediction.author.username}</Link>
                        | {prediction.description} | {prediction.amount} | {prediction.time}
                        | {prediction.ticket} 
                    </div>
                )
            })}<br />
            <Link to="/"><button className="btn">Go Back</button></Link>
        </div>
    )
}

export default withRouter (Created)