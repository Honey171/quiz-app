import React, { useContext } from 'react';
import QuestionSettings from '../components/QuestionSettings';
import Spinner from '../components/Spinner';
import { QuizData } from '../context/fetch';

function Home() {
  const { returnedToHome, loading } = useContext(QuizData);
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      {returnedToHome || loading ? <Spinner /> : <QuestionSettings />}
    </main>
  );
}

export default Home;
