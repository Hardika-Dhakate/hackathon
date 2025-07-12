import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import { Alert, Button, Typography, Box } from '@mui/material';

// Similarity algorithm utilities
const calculateSimilarity = (currentQ, otherQ) => {
  const commonTags = currentQ.tags.filter(tag => 
    otherQ.tags.includes(tag)
  ).length;
  const tagScore = (commonTags / currentQ.tags.length) * 0.5;

  const currentWords = currentQ.title.toLowerCase().split(/\s+/);
  const otherWords = otherQ.title.toLowerCase().split(/\s+/);
  const commonWords = currentWords.filter(word =>
    otherWords.includes(word)
  ).length;
  const titleScore = (commonWords / currentWords.length) * 0.3;

  const contentOverlap = otherQ.description.includes(currentQ.title) ? 0.2 : 0;

  return tagScore + titleScore + contentOverlap;
};

const getSimilarQuestions = (currentQuestion, allQuestions) => {
  if (!currentQuestion) return [];
  
  return allQuestions
    .filter(q => q.id !== currentQuestion.id)
    .map(q => ({
      question: q,
      score: calculateSimilarity(currentQuestion, q)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.question);
};

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #1a1a1a;
`;

const QuestionsList = styled.div`
  display: grid;
  gap: 20px;
`;

const SimilarQuestionsSection = styled.div`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const BrowseQuestions = ({ questions }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentQuestion = id ? questions.find(q => q.id === Number(id)) : null;
  const similarQuestions = currentQuestion 
    ? getSimilarQuestions(currentQuestion, questions)
    : [];

  return (
    <PageContainer>
      <Header>
        <Title>{currentQuestion ? 'Question Details' : 'Browse Questions'}</Title>
        <Button 
          variant="contained" 
          onClick={() => navigate('/ask-question')}
        >
          Ask Question
        </Button>
      </Header>

      {currentQuestion ? (
        <>
          <QuestionCard 
            question={currentQuestion} 
            showFullContent={true}
          />
          
          {similarQuestions.length > 0 && (
            <SimilarQuestionsSection>
              <Typography variant="h5" gutterBottom>
                Similar Questions
              </Typography>
              <QuestionsList>
                {similarQuestions.map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onClick={() => navigate(`/questions/${question.id}`)}
                  />
                ))}
              </QuestionsList>
            </SimilarQuestionsSection>
          )}
        </>
      ) : (
        <QuestionsList>
          {questions.length > 0 ? (
            questions.map(question => (
              <QuestionCard
                key={question.id}
                question={question}
                onClick={() => navigate(`/browse-questions/${question.id}`)}
              />
            ))
          ) : (
            <Alert severity="info">
              No questions found. Be the first to ask!
            </Alert>
          )}
        </QuestionsList>
      )}
    </PageContainer>
  );
};

export default BrowseQuestions;