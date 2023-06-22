import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import axios from "axios";

function Profile({ history }) {
  const [predictions, setPredictions] = useState([]);
  const params = useParams();

  useEffect(() => {
    getPredictions();
  }, []);

  const authToken = localStorage.getItem("authToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const getPredictions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/profile/${params.author}`,
        config
      );

      console.log(response.data.result);
      setPredictions(response.data.result);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        history.push("/");
      }
    }
  };

  return (
    <div>
      <h1>Betty Cash</h1>
      <br />
      {predictions.map((prediction, index) => {
        return (
          <div key={index}>
            {prediction.author.username} | {prediction.description} |{" "}
            {prediction.amount}
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(Profile);
