import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/question';
import Score from './components/score';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [numQuestions, setNumQuestions] = useState(3);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchQuestions = (num) => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=${num}&category=9&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((question) => ({
          question: question.question,
          options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
          correctAnswer: question.correct_answer,
        }));
        setQuestions(formattedQuestions);
        setSelectedOptions(new Array(formattedQuestions.length).fill(''));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions(numQuestions);
  }, [numQuestions]);

  const handleSelectOption = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);

    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(true);
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setShowAnswer(false);
      } else {
        setShowScore(true);
      }
    }, 2000); // Display answer for 2 seconds before moving to the next question
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions(new Array(numQuestions).fill(''));
    setScore(0);
    setShowScore(false);
    setShowAnswer(false);
    fetchQuestions(numQuestions);
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(parseInt(event.target.value));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setShowAnswer(false);
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <div className="question-count">
          <label htmlFor="numQuestions">Number of Questions: </label>
          <select id="numQuestions" value={numQuestions} onChange={handleNumQuestionsChange}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        {showScore ? (
          <Score score={score} total={questions.length} onRestart={handleRestart} />
        ) : (
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedOption={selectedOptions[currentQuestionIndex]}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
            showAnswer={showAnswer}
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
