import React from 'react';

const Score = ({ score, total, onRestart }) => {
  return (
    <div className="score-container">
      <h2>Your Score: {score} out of {total}</h2>
      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Score;
