import React, { useState, useEffect } from "react";
import cheers from "./sounds/cheering.wav";
import wrong from "./sounds/wrong.wav";

const defaultQuestionsArray = [
  {
    id: 1,
    questionText: "What is the capital of India?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "New Delhi", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    id: 2,
    questionText: "Who is World's richest man?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: true },
      { answerText: "Mukesh Ambani", isCorrect: false },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  {
    id: 3,
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "Apple", isCorrect: true },
      { answerText: "Intel", isCorrect: false },
      { answerText: "Amazon", isCorrect: false },
      { answerText: "Microsoft", isCorrect: false },
    ],
  },
  {
    id: 4,
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1", isCorrect: false },
      { answerText: "4", isCorrect: false },
      { answerText: "6", isCorrect: false },
      { answerText: "7", isCorrect: true },
    ],
  },
  {
    id: 5,
    questionText: "Name the highest mountain peak in the world",
    answerOptions: [
      { answerText: " Mt. Kilimanjaro", isCorrect: false },
      { answerText: "Mt. Fuji", isCorrect: false },
      { answerText: "K2", isCorrect: false },
      { answerText: "Mt. Everest", isCorrect: true },
    ],
  },
  {
    id: 6,
    questionText: "What is 2 + 2",
    answerOptions: [
      { answerText: "0", isCorrect: false },
      { answerText: "1", isCorrect: false },
      { answerText: "2", isCorrect: false },
      { answerText: "4", isCorrect: true },
    ],
  },
  {
    id: 7,
    questionText: "Name the National Animal of India",
    answerOptions: [
      { answerText: "Lion", isCorrect: false },
      { answerText: "Tiger", isCorrect: true },
      { answerText: "Wolf", isCorrect: false },
      { answerText: "Jackal", isCorrect: false },
    ],
  },
  {
    id: 8,
    questionText: "What is 4*5?",
    answerOptions: [
      { answerText: "20", isCorrect: true },
      { answerText: "35", isCorrect: false },
      { answerText: "40", isCorrect: false },
      { answerText: "22", isCorrect: false },
    ],
  },
  {
    id: 9,
    questionText: "Name the Biggest Country",
    answerOptions: [
      { answerText: "China", isCorrect: false },
      { answerText: "Australia", isCorrect: false },
      { answerText: "India", isCorrect: false },
      { answerText: "Russia", isCorrect: true },
    ],
  },
  {
    id: 10,
    questionText: "Name the First person on moon",
    answerOptions: [
      { answerText: "Neil Armstrong", isCorrect: true },
      { answerText: "Edwin Aldrin", isCorrect: false },
      { answerText: "Tenzing Norgay", isCorrect: false },
      { answerText: "Donald Trump", isCorrect: false },
    ],
  },
];

export default function App() {
  const [currentquestion, setcurrentquestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [Showscore, setShowscore] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showCorrectBox, setShowCorrectBox] = useState(false);
  const [showIncorrectBox, setShowIncorrectBox] = useState(false);
  const correctaudio = new Audio(cheers);
  const incorrectaudio = new Audio(wrong);

  useEffect(() => {
    function returnRandomQuestion() {
      const { floor, random } = Math;
      return defaultQuestionsArray[floor(random() * 10)];
    }

    function generateRandomQuesArray() {
      let newArr = defaultQuestionsArray;
      while (newArr.length > 5) {
        let randomQuesObj = returnRandomQuestion();
        newArr = newArr.filter((obj) => obj.id !== randomQuesObj.id);
      }
      return newArr;
    }

    const randomQuestionArray = generateRandomQuesArray();
    setQuestions(randomQuestionArray);
  }, []);

  const handleAnswer = ({ answerOptions }) => {
    if (answerOptions.isCorrect) {
      setScore(score + 1);
      setShowCorrectBox(true);
      correctaudio.play();
    } else {
      incorrectaudio.play();
      setShowIncorrectBox(true);
    }
    setIsAnswered(true);
    const nextQues = currentquestion + 1;
    if (nextQues < questions.length) {
      setTimeout(() => {
        setcurrentquestion(nextQues);
        setIsAnswered(false);
        setShowCorrectBox(false);
        setShowIncorrectBox(false);
      }, 3000);
    } else {
      setShowscore(true);
      setShowCorrectBox(false);
      setShowIncorrectBox(false);
    }
  };

  function renderCorrectHightlightedOptions() {
    return (
      <div className="answer-section">
        {questions[currentquestion].answerOptions.map((answerOptions) => (
          <button
            key={answerOptions.answerText}
            className={answerOptions.isCorrect ? "correct" : "incorrect"}
          >
            {answerOptions.answerText}
          </button>
        ))}
      </div>
    );
  }

  function renderBeforeAnsweredSection() {
    return (
      <div className="answer-section">
        {questions[currentquestion].answerOptions.map((answerOptions) => (
          <button
            key={answerOptions.answerText}
            onClick={() => handleAnswer({ answerOptions })}
          >
            {answerOptions.answerText}
          </button>
        ))}
      </div>
    );
  }

  function renderAnswerSection() {
    if (isAnswered) {
      return renderCorrectHightlightedOptions();
    }
    return renderBeforeAnsweredSection();
  }

  function renderCorrectCircleAnimation() {
    if (!showCorrectBox) {
      return null;
    }
    return (
      <div className="circle1">
        <h1>+1</h1>
      </div>
    );
  }

  function renderIncorrectCircleAnimation() {
    if (!showIncorrectBox) {
      return null;
    }
    return (
      <div className="circle2">
        <h1>+0</h1>
      </div>
    );
  }

  if (questions.length > 0) {
    return (
      <div className="app">
        {renderIncorrectCircleAnimation()}
        <div className="main-content-box">
          {Showscore ? (
            <div className="score-section">
              You scored {score} out of {questions.length}
              <button onClick={() => window.location.reload(false)}>
                Play Again!
              </button>
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentquestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentquestion].questionText}
                </div>
              </div>
              {renderAnswerSection()}
            </>
          )}
        </div>
        {renderCorrectCircleAnimation()}
      </div>
    );
  }

  return null;
}
