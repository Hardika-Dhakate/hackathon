import React from 'react';
import { useNavigate } from 'react-router-dom';
import AskQuestionForm from './AskQuestionForm';

const AskQuestionPage = ({ addQuestion }) => {
  const navigate = useNavigate();

  const handleSubmit = async (questionData) => {
    try {
      // Add the question to state
      addQuestion({
        ...questionData,
        id: Date.now(), // Generate unique ID
        answers: [],
        votes: 0,
        views: 0
      });
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <AskQuestionForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AskQuestionPage;