import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Created ({ history }) {
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trending`, config)
            setPredictions(response.data.result)
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }        
    }
    // const due = new Date();
    // const dateString = due.toLocaleDateString('en-NG',{
    // weekday: "short",
    // year: "numeric",
    // month: "long",
    // day: "numeric"
    // })

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
                        <Link to= "/profile">{prediction.author.username}</Link>
                        | {prediction.description} | {prediction.amount} | 
                        | {prediction.time}
                    </div>
                )
            })}
        </div>
    )
}

export default withRouter (Created)