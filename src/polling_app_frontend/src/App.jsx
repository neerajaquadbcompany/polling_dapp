import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import PieChart from './components/PieChart';
import { polling_app_backend } from 'declarations/polling_app_backend';

function App() {
  const [question, setQuestion] = useState('');
  const [votes, setVotes] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionAndVotes = async () => {
      setLoading(true);
      const fetchedQuestion = await polling_app_backend.getQuestion();
      setQuestion(fetchedQuestion);
      console.log('fetched Question ==>', fetchedQuestion);
      const votesArray = await polling_app_backend.getVotes();
      const votesObj = votesArray.reduce((acc, [option, count]) => {
        acc[option] = Number(count);
        return acc;
      }, {});
      setVotes(votesObj);
      console.log('Voting options ==>', votesObj);
      setLoading(false);
    };
    fetchQuestionAndVotes();
  }, []);

  const handleVote = async (option) => {
    const updatedVotesArray = await polling_app_backend.vote(option);
    
    
    const updatedVotes = updatedVotesArray.reduce((acc, [option, count]) => {
      acc[option] = Number(count);
      return acc;
    }, {});

    
    setVotes(updatedVotes);
    console.log('Updated votes:', updatedVotes);
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    handleVote(option); 
  };

  useEffect(() => {
    console.log('Votes updated:', votes);
  }, [votes]);

  if (loading) {
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-4 bg-gradient-to-tr animate-spin from-green-500 to-blue-500 via-purple-500 rounded-full">
          <div className="bg-white rounded-full">
            <div className="w-16 h-16 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className=" mx-auto flex flex-col md:flex-row justify-center items-center p-6 space-y-8 md:space-y-0 md:space-x-8   ">
            <div className="space-y-4 w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg md:text-xl font-semibold text-center text-gray-800">{question}</h2>
              <div className="radio-group space-y-2">
                {Object.keys(votes).map((option) => (
                  <div key={option}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                        className="form-radio  text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
              <PieChart votes={votes} />
            </div>
        </div>
    </div>
    
  );
}

export default App;
