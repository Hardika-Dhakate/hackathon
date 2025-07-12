import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AnswerForm from '../components/AnswerForm';
import AnswerList from '../components/AnswerList';
import { Button } from '@mui/material';
// Add these styled components at the top of the file (before the QuestionDetail component)
const QuestionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const QuestionTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const QuestionBody = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;
const QuestionDetail = ({ questions, setQuestions, currentUserId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const question = questions.find(q => q.id === Number(id));

  const handleAddAnswer = (newAnswer) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === Number(id)) {
        return {
          ...q,
          answers: [...(q.answers || []), {
            ...newAnswer,
            authorId: currentUserId,
            votes: 0,
            isAccepted: false,
            userVote: null
          }]
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setShowAnswerForm(false);
  };

  const handleVote = (answerId, voteType) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === Number(id)) {
        const updatedAnswers = q.answers.map(a => {
          if (a.id === answerId) {
            // Calculate vote changes
            let voteChange = 0;
            let newUserVote = voteType;
            
            if (a.userVote === voteType) {
              // Clicking same vote again removes it
              voteChange = voteType === 'upvote' ? -1 : 1;
              newUserVote = null;
            } else if (a.userVote) {
              // Changing vote
              voteChange = voteType === 'upvote' ? 2 : -2;
            } else {
              // New vote
              voteChange = voteType === 'upvote' ? 1 : -1;
            }
            
            return {
              ...a,
              votes: a.votes + voteChange,
              userVote: newUserVote
            };
          }
          return a;
        });
        
        return {
          ...q,
          answers: updatedAnswers
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const handleAcceptAnswer = (answerId) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === Number(id)) {
        const updatedAnswers = q.answers.map(a => {
          return {
            ...a,
            isAccepted: a.id === answerId
          };
        });
        
        return {
          ...q,
          answers: updatedAnswers,
          isAnswered: true
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <QuestionContainer>
      <Button 
        variant="outlined" 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Questions
      </Button>

      <QuestionTitle>{question.title}</QuestionTitle>
      
      <QuestionBody 
        dangerouslySetInnerHTML={{ __html: question.description }} 
      />
      
      <div style={{ margin: '2rem 0' }}>
        <Button 
          variant="contained" 
          onClick={() => setShowAnswerForm(!showAnswerForm)}
        >
          {showAnswerForm ? 'Cancel' : 'Post Answer'}
        </Button>
      </div>

      {showAnswerForm && (
        <AnswerForm 
          onSubmit={handleAddAnswer} 
          onCancel={() => setShowAnswerForm(false)}
        />
      )}

      <AnswerList 
        answers={question.answers || []}
        questionOwnerId={question.authorId}
        currentUserId={currentUserId}
        onVote={handleVote}
        onAccept={handleAcceptAnswer}
      />
    </QuestionContainer>
  );
};
export default QuestionDetail;