import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #ff6ec4, #7873f5, #4adeff);
  color: white;
`;

const Title = styled.h1`
  font-size: 52px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #ffffff, #f2f2f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #f0f0f0;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 14px 28px;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  background: ${({ primary }) => (primary ? '#ffffff' : 'transparent')};
  color: ${({ primary }) => (primary ? '#4a3aff' : '#ffffff')};
  border: ${({ primary }) => (primary ? 'none' : '2px solid white')};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ primary }) => (primary ? '#f0f0f0' : 'rgba(255,255,255,0.2)')};
  }
`;

const Hero = () => {
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    navigate('/ask-question');
  };

  const handleBrowseQuestion = () => {
    navigate('/browse-questions'); // Fixed path to match your route
  };

  return (
    <HeroSection>
      <Title>StackIt</Title>
      <Subtitle>
        A minimal, community-driven Q&A platform where developers help each other solve problems and share knowledge.
      </Subtitle>
      <ButtonGroup>
        <ActionButton primary onClick={handleAskQuestion}>
          Ask Your First Question
        </ActionButton>
        <ActionButton primary onClick={handleBrowseQuestion}>
          Browse Questions
        </ActionButton>
      </ButtonGroup>
    </HeroSection>
  );
};

export default Hero;