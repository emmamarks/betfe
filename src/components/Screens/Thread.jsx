import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

function Examiner() {
    
    return(
        <div>
            <p>Click on link sent to your mail to confirm your account</p>
        </div>
    );
}

export default withRouter (Examiner)