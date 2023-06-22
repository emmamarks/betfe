import React, { useState, useEffect } from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import axios from "axios";

function Details({ history }) {
  const { _id } = useParams();
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [ticket, setTicket] = useState("");

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
        `${process.env.REACT_APP_BACKEND_URL}/details/${_id}`,
        config
      );

      setPredictions(response.data.result);
      setDescription(response.data.result.description);
      setTicket(response.data.result.ticket);
    } catch (error) {
      console.log(error.response);
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
      {description} || {ticket}
    </div>
  );
}

export default withRouter(Details);
