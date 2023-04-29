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
        bank:'',
        account:'',
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

        if(input.bank && input.account && input.confirmaccount && input.email && input.phone){

            if(typeof input.bank !== 'undefined'){
                const re = /^\S*$/;
                if(input.bank.length < 5 || !re.test(input.bank)){
                    return setError("bank must contain at least 5 characters")
                }
                const reg = /^[^0-9#$%&*()-][0-9a-z]*$/i
                if(!reg.test(input.bank)){
                    return setError("Please, provide a valid bank")
                }
            }

            if(typeof input.account !== 'undefined'){
                if(input.account.length < 5){
                    return setError("account must contain at least 6 characters")
                }
            }

            if(input.account !== input.confirmaccount){
                return setError("accounts do not match")
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
                    bank:input.bank,
                    account:input.account,
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
                    Welcome to Betty Cash
                </h1>
            </Link>
            {error && <span>{error}</span>}<br /><br />
            Bank: <input type="text" placeholder="Choose bank"
            name="bank" onChange={handleChange} value={input.bank} /><br /> <br />
            Account Number: <input type="account" placeholder="Choose account"
            name="account" onChange={handleChange} value={input.account} /><br /> <br />
            Account Name: <br /> <br />
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
