import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { QuizData } from './context/fetch';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';

function App() {
  const { returnedToHome, setReturnedToHome, quizQuestions } =
    useContext(QuizData);
  const navigate = useNavigate();

  useEffect(() => {
    if (returnedToHome) {
      window.location.reload();
    }
    window.addEventListener('popstate', () => {
      setReturnedToHome(true);
    });
    return () => {
      window.removeEventListener('popstate', () => {
        setReturnedToHome(true);
      });
    };
  }, [returnedToHome, setReturnedToHome]);

  useEffect(() => {
    if (quizQuestions.length <= 0) {
      navigate('/');
    } else {
      navigate('/questions');
    }
  }, [navigate, quizQuestions]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/questions"
        element={<QuizPage />}
      />
    </Routes>
  );
}

export default App;
