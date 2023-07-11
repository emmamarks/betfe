import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import axios from 'axios';

const Paystack = ({ history }) => {

  const {_id} = useParams();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");

  const [config, setConfig] = useState({
		email: localStorage.getItem("email"),
		amount: localStorage.getItem("amount"),
		//publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
		publicKey: "pk_test_21b3d8241a4c462ac7c90a284ddeb37cdab27b69"
	});

	const initializePayment = usePaystackPayment(config);


	function onSuccess () {
		try {
			const res = axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/paid`,
            );
		} catch (error) {
			setError(error.response.data.error);
		}
		// const timeout = setTimeout(() => {
		// 	// 👇️ redirects to an external URL
		// 	window.location.replace('http://localhost:3000/');
		//   }, 3000);
	  
		// return () => clearTimeout(timeout);
	};


	const onClose = () => {
		alert("Oops, Payment not completed");
	};
	const handleClick = (e) => {
		initializePayment(onSuccess, onClose);
	};

  const authToken = localStorage.getItem('authToken');
  const confi = {
    headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
    }
  }

  useEffect(() => {
    getPredictions()
  }, [])

  const getPredictions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pay/${_id}`, confi)
      setDescription(response.data.result.description)
      setAmount(response.data.result.amount)
      setEmail(response.data.result.email)
    } catch (error) {
      localStorage.removeItem('authToken');
      history.push('/')
    } 
  }

	return (
		<>
			<div className="container">
				<h1>
					Betty Cash
				</h1>
				Amount: ₦{amount / 100}<br /> <br />
				Description: {description}<br /> <br />
				Email: {email}<br /> <br />
				<div className="row mt-5">
					<div className="col-sm-4 mx-auto my-form text-center">							
							<div>
								<button onClick={(e) => handleClick()} className="btn">Pay Now</button>
							</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Paystack;