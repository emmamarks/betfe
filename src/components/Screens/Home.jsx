import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Home({ history }) {

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home`, config)

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
                Betty Cash
            </h1>
            <br />
            Welcome <Link>{username}</Link> <br /> <br />
            <button onClick={(e) => handleClick()} className="btn">Logout</button><br /> <br />
        </div>
    );
}

export default withRouter(Home);