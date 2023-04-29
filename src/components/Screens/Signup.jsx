import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Signup({ history }) {

    useEffect(() =>{
        if(localStorage.getItem('authtoken')){
            history.push('/forum');
        }
    }, [ history ]);

    const [input, setInput] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        email:'',
        phone:''
    })

    const [error, setError] = useState('');

    function handleChange(event) {
        const{name, value} = event.target;

        setInput(prevInput =>{
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    async function handleClick(event){
        event.preventDefault();

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        if(input.username && input.password && input.confirmPassword && input.email && input.phone){

            if(typeof input.username !== 'undefined'){
                const re = /^\S*$/;
                if(input.username.length < 5 || !re.test(input.username)){
                    return setError("Username must contain at least 5 characters")
                }
                const reg = /^[^0-9#$%&*()-][0-9a-z]*$/i
                if(!reg.test(input.username)){
                    return setError("Please, provide a valid Username")
                }
            }

            if(typeof input.password !== 'undefined'){
                if(input.password.length < 5){
                    return setError("Password must contain at least 6 characters")
                }
            }

            if(input.password !== input.confirmPassword){
                return setError("Passwords do not match")
            }

            if(typeof input.email !== 'undefined'){
                const re = /\S+@\S+\.\S+/;
                if(!re.test(input.email)){
                    return setError("Please, provide a valid email")
                }
            }

            if(typeof input.phone !== 'undefined'){
                const re = /^\d{11}$/;
                if(!re.test(input.phone)){
                    return setError("Please, provide a valid phone number")
                }
            }
           
            try {
                const registered = {
                    username:input.username,
                    password:input.password,
                    email:input.email,
                    phone:input.phone
                }
                
                await axios.get(
                    `https://maylancer.org/api/nuban/api.php`,
                    registered,
                    config
                )
                                                        
                history.push('/confirmation');

            } catch (error) {
                setError(error.response.data.error)
            }
        }else{
            return setError("Please fill all fields")
        }       
    }

    return <div>
        <form>
            <Link to="/">
                <h1>
                    Welcome to decimal gods
                </h1>
            </Link>
            {error && <span>{error}</span>}<br /><br />
            Choose Username: <input type="text" placeholder="Choose Username"
            name="username" onChange={handleChange} value={input.username} /><br /> <br />
            Choose Password: <input type="password" placeholder="Choose Password"
            name="password" onChange={handleChange} value={input.password} /><br /> <br />
            Confirm Password: <input type="password" placeholder="Confirm Password"
            name="confirmPassword" onChange={handleChange} value={input.confirmPassword}/><br /> <br />
            Email: <input type="email" placeholder="Email"
            name="email" onChange={handleChange} value={input.email} /><br /> <br />
            Phone: <input type="tel" placeholder="Phone"
            name="phone" onChange={handleChange} value={input.phone} /><br /> <br />
            <Link to = "/"><button className="btn">Go Back</button></Link>
            <button onClick={(e) => handleClick(e)} className="btn">Register</button>
        </form> <br /> <br />
        <small>
            <Link to = "/">Home</Link>|   AboutUs|     info@cbt.com|    08133050899|     
            13, Ikate, Lekki Phase I, Lagos, Nigeria|   FAQ|    Privacy Policy|   Terms of Service| © Jacob 2021
        </small>
    </div>
}

export default withRouter (Signup)
