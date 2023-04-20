import React, { useState } from 'react';
import { Link,  } from "react-router-dom";
import axios from 'axios';

function Forgot() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [input, setInput] = useState({
        email:''
    })

    function handleChange(event) {
        const{name, value} = event.target;

        setInput(prevInput =>{
            return{
                ...prevInput,
                [name]: value
            }
        })
    }



    async function handleClick(e){
        //e.preDefault();

        const config = {
            header:{
                'Content-Type': 'application/json'
            }
        }

        if(input.email){
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}//forgotpassword`, { email }, config)
                
                setSuccess(data.data);
            } catch (error) {
                return setError(error.response.data.error)
            }
        }else{
            return setError("Enter your email")
        }

        
    }

    return <div>
        <h3>Forgot Password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        <div>
            <p>Please, Enter the email address or Phone Number you registered with</p>
            Email:<input type="email" placeholder="Email"
            name="email" onChange={handleChange} value={input.email}/><br /> <br />
            <button onClick={(e) => handleClick(e)} className="btn">Submit</button>
            <Link to = "/"><button className="btn">Go Back</button></Link>
        </div>
    </div>  
}

export default Forgot