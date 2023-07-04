import React, { useState, useEffect } from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import axios from 'axios';

const Paystack = ({ history }) => {
  const {_id} = useParams();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [predictions, setPredictions] = useState([]);
  const params = useParams();

	// Setting config object to a state to dynamically capture info from Form
	const [config, setConfig] = useState({
		email: localStorage.getItem("email"),
		amount: localStorage.getItem("amount"),
		publicKey: "pk_test_c7ed2f7ea919bcddf3828375e170b8a5d49570a3",
	});

	// First initialization of the Library
	const initializePayment = usePaystackPayment(config);

	// Callback if transaction is successful
	const onSuccess = () => {
		alert("Payment Successful, check your email for confirmation");
	};

	// Callback if payment gateway is closed
	const onClose = () => {
		alert("Opps, Payment not completed");
	};
	const handleClick = (e) => {

		// Trigger Payment Gateway on Form Submit
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
				Amount: ₦{amount}<br /> <br />
				Description: {description}<br /> <br />
				Email: {email}<br /> <br />
				<div className="row mt-5">
					<div className="col-sm-4 mx-auto my-form text-center">							
							<div>
              					<Link to = '/home'><button className="btn">Go Back</button></Link>
								<button onClick={(e) => handleClick()} className="btn">Pay Now</button>
							</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Paystack;