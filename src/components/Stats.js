import React from 'react';
import styled from 'styled-components';
import { FaCommentAlt, FaUsers, FaAward, FaChartLine } from 'react-icons/fa';

const StatsWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 60px 20px;
  background: #f8f9fa;
  flex-wrap: wrap;
  gap: 30px;
`;

const Stat = styled.div`
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 220px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 36px;
  background: linear-gradient(90deg, #4a3aff, #6f77ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
`;

const Number = styled.h3`
  font-size: 28px;
  color: #333;
  margin: 0;
`;

const Label = styled.p`
  color: #666;
  margin: 6px 0 0;
  font-weight: 500;
`;

const Stats = () => (
  <StatsWrapper>
    <Stat>
      <Icon><FaCommentAlt /></Icon>
      <Number>1,247</Number>
      <Label>Questions</Label>
    </Stat>
    <Stat>
      <Icon><FaUsers /></Icon>
      <Number>523</Number>
      <Label>Active Users</Label>
    </Stat>
    <Stat>
      <Icon><FaAward /></Icon>
      <Number>892</Number>
      <Label>Accepted Answers</Label>
    </Stat>
    <Stat>
      <Icon><FaChartLine /></Icon>
      <Number>95%</Number>
      <Label>Success Rate</Label>
    </Stat>
  </StatsWrapper>
);

export default Stats;
