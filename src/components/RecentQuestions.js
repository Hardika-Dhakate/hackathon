import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';

const QuestionsContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const QuestionsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  color: #1a1a1a;
`;

const QuestionList = styled.div`
  display: grid;
  gap: 20px;
`;

const NoQuestions = styled.p`
  text-align: center;
  color: #666;
  padding: 40px;
`;

const ViewAllButton = styled.button`
  background: transparent;
  border: none;
  color: #4a3aff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const RecentQuestions = ({ questions = [] }) => {
  const navigate = useNavigate();

  return (
    <QuestionsContainer>
      <QuestionsTitle>Recent Questions</QuestionsTitle>
      {questions.length > 0 ? (
        <>
          <QuestionList>
            {questions.slice(0, 3).map(question => (
              <QuestionCard 
                key={question.id}
                question={question}
                onClick={() => navigate(`/question/${question.id}`)}
              />
            ))}
          </QuestionList>
          {questions.length > 3 && (
            <ViewAllButton onClick={() => navigate('/browse-questions')}>
              View All Questions ({questions.length})
            </ViewAllButton>
          )}
        </>
      ) : (
        <NoQuestions>
          No questions yet. 
          <span 
            style={{color: '#4a3aff', cursor: 'pointer', marginLeft: '5px'}}
            onClick={() => navigate('/ask-question')}
          >
            Be the first to ask!
          </span>
        </NoQuestions>
      )}
    </QuestionsContainer>
  );
};

export default RecentQuestions;