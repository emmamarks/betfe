import React from 'react'
import { Link,  } from "react-router-dom";

function Result() {
    return(
        <div>
            <Link to = "/forum">
                <h1>
                    Decimal gods
                </h1>
            </Link>
            Enter Green Code Here: <input type="text" placeholder ="Enter Green Code"
            name="green" id="green"  /><br /> <br />
            <Link to= "/forum"><button type="button" class="btn">Go Back</button></Link>
            <Link to= "/verify"><button type="button" class="btn">Submit</button></Link>
        </div>
    )
}

export default Result