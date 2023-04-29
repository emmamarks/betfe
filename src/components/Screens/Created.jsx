import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

const Created = props => {
    const [predictions, setPredictions] = useState([]);

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
            // localStorage.removeItem('authToken');
            // history.push('/')
        }        
    }

    return(
        <div>
            {predictions.map((prediction, index) =>{
                return(
                    <div key={index}>
                        {prediction.author.username} | {prediction.booking} | {prediction.subject} 
                    </div>
                )
            })}
        </div>
    )
}

export default withRouter (Created)