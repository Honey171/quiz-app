import React, { useContext, useState } from 'react';
import Questions from '../components/Questions';
import QuizResult from '../components/QuizResult';
import Spinner from '../components/Spinner';
import { QuizData } from '../context/fetch';

function QuizPage() {
  const { loading } = useContext(QuizData);
  const [quizFinished, setQuizFinished] = useState(false);
  const [trueAnswerCount, setTrueAnswerCount] = useState(0);

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      {!quizFinished && !loading && (
        <Questions
          quizFinished={quizFinished}
          setQuizFinished={setQuizFinished}
          setTrueAnswerCount={setTrueAnswerCount}
        />
      )}
      {quizFinished && !loading && (
        <QuizResult trueAnswerCount={trueAnswerCount} />
      )}
      {loading && <Spinner />}
    </main>
  );
}

export default QuizPage;
