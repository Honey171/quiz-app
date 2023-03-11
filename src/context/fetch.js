import React, { createContext, useEffect, useState } from 'react';

export const QuizData = createContext({
  quizQuestionsFetch: async () => {},
});

export const QuizDataProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    { category: 'arts_and_literature', isSelected: false },
    { category: 'film_and_tv', isSelected: false },
    { category: 'food_and_drink', isSelected: false },
    { category: 'general_knowledge', isSelected: false },
    { category: 'geography', isSelected: false },
    { category: 'history', isSelected: false },
    { category: 'music', isSelected: false },
    { category: 'science', isSelected: false },
    { category: 'society_and_culture', isSelected: false },
    { category: 'sport_and_leisure', isSelected: false },
  ]);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState('');
  const [quizQuantity, setQuizQuantity] = useState(5);
  const [returnedToHome, setReturnedToHome] = useState(false);

  useEffect(() => {
    setSelectedCategories(
      categories
        .filter((category) => category.isSelected === true)
        .map((category) => category.category)
        .join(),
    );
  }, [categories]);

  const quizQuestionsFetch = async () => {
    try {
      setLoading(true);
      if (difficulty !== '' && selectedCategories !== '') {
        const response = await fetch(
          `https://the-trivia-api.com/api/questions?categories=${selectedCategories}&limit=${quizQuantity}&difficulty=${difficulty}`,
        );
        const data = await response.json();
        setQuizQuestions(data);
        setLoading(false);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <QuizData.Provider
      value={{
        quizQuestionsFetch,
        quizQuestions,
        setQuizQuestions,
        categories,
        setCategories,
        difficulty,
        setDifficulty,
        quizQuantity,
        setQuizQuantity,
        loading,
        setLoading,
        selectedCategories,
        returnedToHome,
        setReturnedToHome,
      }}
    >
      {children}
    </QuizData.Provider>
  );
};
