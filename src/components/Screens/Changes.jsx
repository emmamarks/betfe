import React from 'react'
import emailjs from '@emailjs/browser';
import { Link,  } from "react-router-dom";

function Changes() {

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
        });
    };

    return(
        <div>
            <h1>
                Decimal gods
            </h1>
            
            <Link to= "/confirm"><button type="button" class="btn" onClick={sendEmail}>
            Send Mail</button></Link><br /> <br />
        </div>
    )
}

export default Changes