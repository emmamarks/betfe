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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/created`, config)

            setPredictions(response.data.result)
        

        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }        
    }

    

    return(
        <div>
            <h1>
                Betty Cash
            </h1>
            <br />
            {predictions.map((prediction, index) =>{
                return(
                    <div key={index}>
                        <Link to= "/profile">{prediction.author.username}</Link>
                        | {prediction.description} | {prediction.amount} 
                    </div>
                )
            })}
        </div>
    )
}

export default withRouter (Created)