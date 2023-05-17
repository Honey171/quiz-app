import { useContext, useEffect, useState } from 'react';
import { QuizData } from '../context/fetch';
import icon from '../assets/thinking-icon.webp';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Questions({ quizFinished, setQuizFinished, setTrueAnswerCount }) {
  const { quizQuestions, setReturnedToHome, setLoading } = useContext(QuizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    if (quizQuestions.length > 0) {
      const question = quizQuestions[currentQuestionIndex];
      setCorrectAnswer(question?.correctAnswer);
      setAnswers(
        shuffleArray([...question?.incorrectAnswers, question?.correctAnswer]),
      );
    }
  }, [quizQuestions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setChosenAnswer('');
    setSelectedAnswerIndex(-1);
  };

  const answerCheckHandler = () => {
    if (chosenAnswer !== '') {
      setIsAnswerSubmitted(true);
      if (answers[selectedAnswerIndex] === correctAnswer) {
        setIsCorrect(true);
        setTrueAnswerCount((prevIndex) => prevIndex + 1);
      } else {
        setIsCorrect(false);
      }
    } else {
      return;
    }
  };

  const chosenAnswerHandler = (e, idx) => {
    setSelectedAnswerIndex(idx);
    setChosenAnswer(e.target.innerHTML);
  };

  const quizEndHandler = () => {
    setQuizFinished(true);
  };

  return (
    <>
      <section className="flex flex-col items-center bg-[#49302b] min-h-[35rem] min-w-[20rem] max-w-[23rem] py-10 relative rounded-lg space-y-4">
        <Link
          to={'/'}
          onClick={() => {
            setLoading(true);
            setReturnedToHome(true);
          }}
          className="absolute top-5 left-5 gap-1 flex items-center justify-center text-[#fdfbee] text-sm cursor-pointer transition-all duration-300 hover:text-base outline-none focus:text-base"
        >
          <AiOutlineLeft /> BACK TO SETTINGS
        </Link>
        <img
          src={icon}
          alt=""
          className="w-40 h-40 rounded-md border-l-2 border-r-4 border-r-[#3ea6a7] border-t-2 border-t-black"
        />
        <p className="text-center font-bold  text-[#fdfbee] px-1">
          <span className="family shadow-sm px-0.5 shadow-[#fdfbee]">
            Question No {currentQuestionIndex + 1}
          </span>
          <br />
          {quizQuestions[currentQuestionIndex]?.question}
        </p>
        <ul className="space-y-2 h-auto">
          {answers.map((answer, idx) => (
            <li
              key={idx}
              onClick={(e) => chosenAnswerHandler(e, idx)}
              className={`bg-[#fdfbee] w-[20rem] transition-all duration-200 cursor-pointer border mx-2 py-1 px-1 font-bold rounded-md text-center outline-none ${
                selectedAnswerIndex === idx &&
                answer !== correctAnswer &&
                isAnswerSubmitted
                  ? 'bg-red-700 text-white'
                  : ''
              } ${isAnswerSubmitted ? 'pointer-events-none' : ''} ${
                selectedAnswerIndex === idx && isCorrect && isAnswerSubmitted
                  ? 'bg-green-700 text-[#fdfbee]'
                  : ''
              } ${
                selectedAnswerIndex === idx && !isAnswerSubmitted
                  ? 'bg-teal-500 text-slate-900'
                  : ''
              } ${
                isAnswerSubmitted && answer === correctAnswer
                  ? 'bg-green-700'
                  : ''
              }`}
            >
              {answer}
            </li>
          ))}
        </ul>
        <div className={`flex items-center justify-center font-bold`}>
          <button
            onClick={answerCheckHandler}
            disabled={isAnswerSubmitted ? true : false}
            className={`${
              isAnswerSubmitted ? 'hidden' : 'inline-block bg-[#fdab71]'
            } px-1 py-1.5 rounded-md transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none`}
          >
            SUBMIT ANSWER
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={isAnswerSubmitted ? false : true}
            className={`${
              currentQuestionIndex !== quizQuestions.length - 1
                ? 'inline-block'
                : 'hidden'
            } ${
              isAnswerSubmitted ? 'inline-block bg-[#fdab71]' : 'hidden'
            } px-1 py-1.5 rounded-md transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none`}
          >
            NEXT QUESTION
          </button>
          <button
            onClick={quizEndHandler}
            className={`${
              currentQuestionIndex === quizQuestions.length - 1 &&
              isAnswerSubmitted
                ? 'inline-block bg-[#fdab71]'
                : 'hidden'
            } px-1 py-1.5 rounded-md transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none`}
          >
            VIEW RESULTS
          </button>
        </div>
      </section>
    </>
  );
}

export default Questions;
