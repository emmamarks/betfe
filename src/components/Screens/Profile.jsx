import React, { useState, useEffect } from 'react';
import { Link, useParams, withRouter } from "react-router-dom";
import axios from 'axios';

function Profile ({ history }) {
    const [predictions, setPredictions] = useState([]);
    const params = useParams();
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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${params.author}`, config)
            setPredictions(response.data.result)
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
            {predictions.map((prediction, index) =>{
                return(
                    <div key={index}>
                        {prediction.author.username} | {prediction.description} | ₦{prediction.amount}
                         | {prediction.createdAt} | {prediction.time} W/L opponent
                    </div>
                )
            })}<br />
            <Link to="/"><button className="btn">Go Back</button></Link>
        </div>
    )
}
export default withRouter (Profile)