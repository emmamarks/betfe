import React, { useState } from 'react';
import { Link, withRouter  } from "react-router-dom";
import axios from 'axios';

function Exam({ history }){

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
        e.preventDefault();

        if(input.email){

            if(typeof input.email !== 'undefined'){
                const re = /\S+@\S+\.\S+/;
                if(!re.test(input.email)){
                    return setError("Please, provide a valid email")
                }
            }

            try {
                const registered = {
                    email:input.email
                }
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot`, registered)
                //setSuccess(data.data);
                history.push('/otp')
            } catch (error) {
                return setError(error.response)
            }
        }else{
            return setError("Enter your email")
        }
        
    }

    return <div>
        <h3>Forgot Password</h3>
        {error && <span>{error}</span>} <br />
        {success && <span id='green'>{success}</span>}
        <div>
            <p>Please, Enter the email address you registered with</p>
            Email:<input type="email" placeholder="Email"
            name="email" onChange={handleChange} value={input.email}/><br /> <br />
            <button onClick={(e) => handleClick(e)} className="btn">Submit</button>
            <Link to = "/"><button className="btn">Go Back</button></Link>
        </div>
    </div>  
}

export default withRouter(Exam);