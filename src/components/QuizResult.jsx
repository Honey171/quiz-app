import React, { useContext } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { QuizData } from '../context/fetch';
import bad from '../assets/bad.gif';
import notBad from '../assets/not-bad.gif';
import good from '../assets/good.gif';
import veryGood from '../assets/very-good.gif';

function QuizResult({ trueAnswerCount }) {
  const { quizQuestions, setReturnedToHome, setLoading } = useContext(QuizData);

  return (
    <section className="flex flex-col items-center bg-[#49302b] min-h-[35rem] min-w-[20rem] max-w-[23rem] py-10 relative rounded-lg space-y-6">
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
        src={
          (trueAnswerCount / quizQuestions.length) * 100 >= 0 &&
          (trueAnswerCount / quizQuestions.length) * 100 <= 40
            ? bad
            : (trueAnswerCount / quizQuestions.length) * 100 > 40 &&
              (trueAnswerCount / quizQuestions.length) * 100 <= 70
            ? notBad
            : (trueAnswerCount / quizQuestions.length) * 100 > 70 &&
              (trueAnswerCount / quizQuestions.length) * 100 <= 90
            ? good
            : (trueAnswerCount / quizQuestions.length) * 100 > 90 &&
              (trueAnswerCount / quizQuestions.length) * 100 <= 100
            ? veryGood
            : ''
        }
        alt="resultRepresentImage"
        className="w-72 h-60 rounded-md"
      />
      <p className="text-center font-semibold text-[#fdab71] px-2 leading-8">
        <span className="text-2xl text-[#fdfbee]">Quiz summary</span> <br />
        You answered <span className="text-green-500">{trueAnswerCount} </span>
        out of <span className="text-white">{quizQuestions.length}</span>{' '}
        questions correctly <br />
        resulting in an{' '}
        <span className="shadow-md shadow-white mr-1">
          {Math.trunc((trueAnswerCount / quizQuestions.length) * 100)}%
        </span>
        success rate.
      </p>
    </section>
  );
}

export default QuizResult;
