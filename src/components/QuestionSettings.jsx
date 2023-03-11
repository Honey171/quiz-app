import { useContext, useEffect, useState } from 'react';
import { QuizData } from '../context/fetch';
import { Link } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';

function QuestionSettings() {
  const {
    quizQuestionsFetch,
    categories,
    setCategories,
    difficulty,
    setDifficulty,
    quizQuantity,
    selectedCategories,
    setQuizQuantity,
    returnedToHome,
    setLoading,
    setReturnedToHome,
  } = useContext(QuizData);
  const [showCategories, setShowCategories] = useState(false);
  const [showDifficulties, setShowDifficulties] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = (index, e) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isSelected = !updatedCategories[index].isSelected;

    setCategories(updatedCategories);
  };

  useEffect(() => {
    if (selectedCategories === '' || difficulty === '') {
      setError('Please select both difficulty and category');
    } else {
      setError('');
    }
  }, [difficulty, selectedCategories]);

  useEffect(() => {
    if (showDifficulties) {
      setShowCategories(false);
    }
  }, [showDifficulties]);

  const handleClick = async (e) => {
    if (error) {
      return;
    } else {
      setLoading(true);
      try {
        setReturnedToHome(false);
        await quizQuestionsFetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {!returnedToHome && (
        <section className="flex flex-col justify-between items-center bg-[#49302b] min-h-[35rem] min-w-[23rem] py-10 relative rounded-lg">
          <p className="text-3xl text-red-600 font-bold absolute -top-10 px-2 border-[#49302b] border-l-4 border-t-4 border-r-4">
            <span className="text-green-600">Quiz </span>Settings
          </p>
          <div className="relative w-48 space-y-1 text-[#fce0b0]">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="focus:outline-none focus:shadow-xl cursor-pointer"
            >
              <span
                className={`flex items-center gap-1 ${
                  showCategories ? 'font-bold border-l pl-1 rounded-md' : ''
                }`}
              >
                Categories
                <AiFillCaretDown
                  className={`${
                    showCategories ? 'rotate-180' : 'rotate-0'
                  } transition-all duration-300 `}
                />
              </span>
            </button>
            <div
              className={`absolute right-0 -top-6 text-xs max-w-[14rem] ${
                showCategories ? 'opacity-1' : 'opacity-0'
              } transition-all duration-300 text-green-500`}
            >
              You can select multiple category!
            </div>
            <form
              onFocus={() => setShowCategories(true)}
              className={` ${
                showCategories
                  ? 'opacity-1 scale-100 h-auto w-[13rem]'
                  : 'opacity-0 scale-0 h-0'
              } transition-all duration-300 w-52 px-2 py-2 space-y-2 rounded-sm bg-[#fdab71] text-black font-medium absolute z-10`}
            >
              <label
                className={`${
                  categories[0].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-md hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[0].isSelected}
                  onChange={() => handleToggle(0)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700 underline"
                />
                <p>Arts & Literature</p>
              </label>
              <label
                className={`${
                  categories[1].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[1].isSelected}
                  onChange={() => handleToggle(1)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Film & TV</p>
              </label>
              <label
                className={`${
                  categories[2].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[2].isSelected}
                  onChange={() => handleToggle(2)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Food & Drink</p>
              </label>
              <label
                className={`${
                  categories[3].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] px-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[3].isSelected}
                  onChange={() => handleToggle(3)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>General Knowledge</p>
              </label>
              <label
                className={`${
                  categories[4].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[4].isSelected}
                  onChange={() => handleToggle(4)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Geography</p>
              </label>
              <label
                className={`${
                  categories[5].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[5].isSelected}
                  onChange={() => handleToggle(5)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>History</p>
              </label>
              <label
                className={`${
                  categories[6].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[6].isSelected}
                  onChange={() => handleToggle(6)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Music</p>
              </label>
              <label
                className={`${
                  categories[7].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[7].isSelected}
                  onChange={() => handleToggle(7)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Science</p>
              </label>
              <label
                className={`${
                  categories[8].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[8].isSelected}
                  onChange={() => handleToggle(8)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Society & Culture</p>
              </label>
              <label
                className={`${
                  categories[9].isSelected ? 'bg-[#0f1a1b] text-white' : ''
                } flex transition-all duration-300 cursor-pointer rounded-md hover:shadow-lg hover:shadow-[#fce0b0] pl-1 py-0.5`}
              >
                <input
                  type="checkbox"
                  value={categories[9].isSelected}
                  onChange={() => handleToggle(9)}
                  className="focus:outline-none focus:shadow-lg focus:shadow-blue-700"
                />
                <p>Sport & Leisure</p>
              </label>
            </form>
          </div>
          <div className="w-48 text-[#fce0b0]">
            <button
              onFocus={() => {
                setShowCategories(false);
                setShowDifficulties(true);
              }}
              onClick={() => setShowDifficulties(!showDifficulties)}
              className={`flex items-center gap-1 ${
                showDifficulties ? 'font-bold border-l pl-1 rounded-md' : ''
              } cursor-pointer focus:outline-none focus:shadow-xl`}
            >
              Difficulty
              <AiFillCaretDown
                className={`${
                  showDifficulties ? 'rotate-180' : 'rotate-0'
                } transition-all duration-300 `}
              />
            </button>
            <form
              className={` ${
                showDifficulties
                  ? 'opacity-1 scale-100 h-auto w-auto'
                  : 'opacity-0 scale-0 h-0'
              } transition-all duration-300 px-2 py-2 space-y-1 absolute z-0`}
            >
              <label>
                <select
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                  }}
                  className="bg-[#fdab71] text-black shadow-md shadow-[#fdab71] font-bold outline-none py-1 rounded-sm"
                >
                  <option value="">Choose a difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            </form>
          </div>
          <div className="w-48 space-y-1 text-[#fce0b0]">
            <p>Question quantity</p>
            <form>
              <label className="flex flex-col">
                <input
                  type="range"
                  value={quizQuantity}
                  min={5}
                  max={20}
                  step={1}
                  onChange={(e) => setQuizQuantity(e.target.value)}
                  onFocus={() => setShowDifficulties(false)}
                  className="focus:outline-offset-1 focus:outline-[#fce0b0] cursor-pointer bg-red-50"
                />
                <p className="text-sm font-bold">Quantity: {quizQuantity}</p>
              </label>
            </form>
          </div>
          <Link
            to={`${error ? '' : '/questions'}`}
            onClick={handleClick}
            className={`${
              error
                ? 'pointer-events-none bg-[#fdfbee] border-2 border-red-500 focus:outline-red-500'
                : 'bg-[#fdab71] border-2 border-green-500 hover:opacity-70 focus:outline-green-500'
            } transition-all duration-300 rounded-md px-1.5 py-1 font-bold`}
          >
            GO TO QUIZ
          </Link>
          <p
            className={`${
              error
                ? 'absolute bottom-[5.3rem] text-sm text-[#fdfbee] font-bold border-2 border-red-500 rounded-md px-1 py-0.5'
                : 'absolute'
            } `}
          >
            {error}
          </p>
        </section>
      )}
    </>
  );
}

export default QuestionSettings;
