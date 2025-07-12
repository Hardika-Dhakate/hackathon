import React from 'react';
import styled from 'styled-components';
// Add these imports at the top
import { 
  Box, 
  Typography, 
  IconButton, 
  Button  // Add this import
} from '@mui/material';
import { 
  ThumbUp, 
  ThumbDown, 
  CheckCircle 
} from '@mui/icons-material';
const AnswerContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  border: ${props => props.isAccepted ? '2px solid #4CAF50' : 'none'};
`;

const AnswerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const VoteControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AcceptedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #4CAF50;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AnswerList = ({ answers, questionOwnerId, currentUserId, onVote, onAccept }) => {
  if (answers.length === 0) {
    return (
      <Typography variant="body1" sx={{ my: 3 }}>
        No answers yet. Be the first to answer!
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
      </Typography>
      {answers.map(answer => (
        <AnswerContainer key={answer.id} isAccepted={answer.isAccepted}>
          {answer.isAccepted && (
            <AcceptedBadge>
              <CheckCircle fontSize="small" />
              <span>Accepted Answer</span>
            </AcceptedBadge>
          )}
          <div dangerouslySetInnerHTML={{ __html: answer.content }} />
          <AnswerMeta>
            <VoteControls>
              <IconButton 
                size="small" 
                onClick={() => onVote(answer.id, 'upvote')}
                color={answer.userVote === 'upvote' ? 'primary' : 'default'}
              >
                <ThumbUp fontSize="small" />
              </IconButton>
              <span>{answer.votes}</span>
              <IconButton 
                size="small" 
                onClick={() => onVote(answer.id, 'downvote')}
                color={answer.userVote === 'downvote' ? 'error' : 'default'}
              >
                <ThumbDown fontSize="small" />
              </IconButton>
            </VoteControls>
            <div>
              {questionOwnerId === currentUserId && !answer.isAccepted && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CheckCircle />}
                  onClick={() => onAccept(answer.id)}
                >
                  Accept Answer
                </Button>
              )}
              <span>Answered on {new Date(answer.createdAt).toLocaleDateString()}</span>
            </div>
          </AnswerMeta>
        </AnswerContainer>
      ))}
    </Box>
  );
};

export default AnswerList;