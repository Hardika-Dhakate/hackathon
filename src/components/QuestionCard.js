import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// Add these imports at the top
import { CheckCircle } from '@mui/icons-material';

// Add this styled component definition (before the QuestionCard component)
const AcceptedBadge = styled.span`
  background: #e8f5e9;
  color: #2e7d32;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
`;

const BodyPreview = styled.p`
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 14px;
`;

const AnswerCount = styled.span`
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const Tag = styled.span`
  background: #e0e0ff;
  color: #4a3aff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 6px;
  font-size: 12px;
`;
const QuestionCard = ({ question, onClick, showFullContent = false }) => {
  const navigate = useNavigate();
  
  const textPreview = question.description
    .replace(/<[^>]*>/g, '')
    .substring(0, 150)
    .replace(/\s+/g, ' ')
    .trim();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(`/question/${question.id}`);
  };

  return (
    <Card onClick={handleClick} style={showFullContent ? { cursor: 'default' } : {}}>
      <Title>
        {question.title}
        {question.isAnswered && (
          <AcceptedBadge>
            <CheckCircle fontSize="small" />
            <span>Answered</span>
          </AcceptedBadge>
        )}
        {!showFullContent && question.answers?.length > 0 && (
          <AnswerCount>
            {question.answers.length} {question.answers.length === 1 ? 'answer' : 'answers'}
          </AnswerCount>
        )}
      </Title>
      
      {showFullContent ? (
        <div dangerouslySetInnerHTML={{ __html: question.description }} />
      ) : (
        <BodyPreview>
          {textPreview}
          {textPreview.length === 150 && '...'}
        </BodyPreview>
      )}
      
      <Meta>
        <div>
          {question.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span>
          Posted on {new Date(question.createdAt).toLocaleDateString()}
        </span>
      </Meta>
    </Card>
  );
};
export default QuestionCard;