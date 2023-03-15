import React from 'react';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function TheEnd(props) {
const navigate = useNavigate();
const location = useLocation();
function handlePlayAgainClick() {
    navigate("/");
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-3 text-center">The {location.state.winner} Wins!!!!</h1>
      <button className="btn btn-primary mt-4" onClick={handlePlayAgainClick}>Wanna play again!</button>
    </div>
  );
}

export default TheEnd;
