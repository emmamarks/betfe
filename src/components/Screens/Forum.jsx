import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Forum({ history }) {

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/')
        }
    })
 
    const [username, setUsername] = useState('');
    const authToken = localStorage.getItem('authToken');

    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/forum`, config)

            setUsername(response.data.username)
            
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }        
    }
    
    useEffect(() => {
        getUserProfile()
    }, [])


    function handleClick(){
        localStorage.removeItem('authToken');
        history.push('/')
    }

    return(
        <div>
            <h1>
                Decimal gods
            </h1>
            <br />
            <Link to= "/account">{}</Link> <br /><br />
            <Link to= "/create"><button class="btn">Share Prediction</button></Link><br /><br />
            <Link to= "/leader">LeaderBoard</Link><br /><br />
            <Link>hottest</Link> <Link to= "/winning">Alert Winning</Link><br /> 
            <button onClick={(e) => handleClick()} className="btn">Logout</button><br /> <br />
        </div>
    );
}

export default withRouter (Forum)