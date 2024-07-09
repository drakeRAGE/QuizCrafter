import React from 'react';

const Question = ({ question, options, selectedOption, onSelectOption, onNext, showAnswer, correctAnswer }) => {
  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option ${showAnswer && option === correctAnswer ? 'correct' : ''} ${
              showAnswer && option !== correctAnswer && option === selectedOption ? 'incorrect' : ''
            }`}
            onClick={() => onSelectOption(option)}
            disabled={showAnswer || selectedOption !== ''}
            dangerouslySetInnerHTML={{ __html: option }}
          ></button>
        ))}
      </div>
      {showAnswer && <p className="answer">Correct answer: <span dangerouslySetInnerHTML={{ __html: correctAnswer }}></span></p>}
      <button className="next-button" onClick={onNext} disabled={selectedOption === ''}>
        Next
      </button>
    </div>
  );
};

export default Question;
