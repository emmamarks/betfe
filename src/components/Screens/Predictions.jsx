import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link,  } from "react-router-dom";

function Account({ history }) {

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/')
        }
    })

    const [error] = useState('');

    const [username, setUsername] = useState('');

    const [booking, setBooking] = useState('');
    const [platform, setPlatform] = useState('');
    const [first, setFirst] = useState('');
    const [start, setStart] = useState('');
    const [last, setLast] = useState('');
    const [end, setEnd] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const authToken = localStorage.getItem('authToken');

    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:4000/app/account', config)
            
            if(response.status===200){
                setUsername(response.data.username)
            }
        } catch (error) {
            localStorage.removeItem('authToken');
            history.push('/')
        }       
    }
    
    useEffect(() => {
        getUserProfile()
    }, [])

    const getPredictions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/predictions`, config)
            
            if(response.status===200){
                setBooking(response.data.booking)
                setPlatform(response.data.platform)
                setFirst(response.data.first)
                setStart(response.data.start)
                setLast(response.data.last)
                setEnd(response.data.end)
                setSubject(response.data.subject)
                setMessage(response.data.message)
            }
        } catch (error) {
            // localStorage.removeItem('authToken');
            // history.push('/')
            console.log(error)
        }       
    }
    
    useEffect(() => {
        getPredictions()
    }, [])
    
    return(
        error ? <span> {error} </span> : <>
            <div>
            <Link to = "/forum">
                <h1>
                Decimal gods
                </h1>
            </Link>
            <Link to= "/account">{username}</Link> <br /><br />
            Booking Code: {booking}<br /><br />
            Platform: {platform}<br /><br />
            First Game: {first} {start}<br /><br />
            Last Game: {last} {end}<br /><br />
            Subject: {subject}<br /><br />
            Message: {message}<br /><br />
            </div>
        </>      
    )
}

export default Account