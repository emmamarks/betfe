import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Login({ history }) {
 
    useEffect(() =>{
        if(localStorage.getItem('authToken')){
            history.push('/home');
        }
    }, [ history ]);
    
    const [input, setInput] = useState({
        username:'',
        password:''
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

    async function handleSubmit(event){
        event.preventDefault();
        try {    
            if(input.username && input.password){
                const registered = {
                    username:input.username,
                    password:input.password
                }
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, registered)
                localStorage.setItem('authToken', response.data.token);
                history.push('/home');
            }else{
                return setError("Username & Password required")
            }
        } catch (error) {
            return setError(error.response.data.error)
        }          
    }

    return <div>
        <h1>
            Betty Cash
        </h1> 
        {error && <span>{error}</span>}<br /><br />
        <form onSubmit={(e) => handleSubmit(e)}>
            Username: <input type="text" placeholder ="Username"
            name="username" id="username" value={input.username} onChange={handleChange} /><br /><br />
            Password: <input type="password" placeholder ="Enter Password"
            name="password" id="password" value={input.password} onChange={handleChange} /><br /> <br />
            <small><Link to= "/forgot">Forgot Password ?</Link></small><br /> <br />
            <button type="submit" className="btn">Login</button>
        </form><br />
        <small>
        <Link to= "/send">New Here? Sign Up </Link><br /> <br />
        © Jacob 2023 
        </small>
    </div>
}
export default withRouter(Login);