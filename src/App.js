import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import AskQuestionPage from './components/AskQuestionPage';
import BrowseQuestions from './components/BrowseQuestions';
import RecentQuestions from './components/RecentQuestions';
import QuestionDetail from './components/QuestionDetail';
import Stats from './components/Stats';

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background: #f9f9fb;
  color: #1a1a1a;
  min-height: 100vh;
`;

function App() {
  const [questions, setQuestions] = useState([]);

  // Load questions from localStorage on mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
  }, []);

  // In App.js - modify your addQuestion function
  const addQuestion = (newQuestion) => {
    const updatedQuestions = [{
      ...newQuestion,
      id: Date.now(), // Ensure ID exists
      createdAt: new Date().toISOString() // Ensure date exists
    }, ...questions];

    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Stats />
              <RecentQuestions questions={questions} />
            </>
          } />
          <Route path="/ask-question" element={<AskQuestionPage addQuestion={addQuestion} />} />
          <Route
            path="/browse-questions"
            element={<BrowseQuestions questions={questions} />}
          />
          <Route
            path="/question/:id"
            element={
              <QuestionDetail
                questions={questions}
                setQuestions={setQuestions}
              />
            }
          />
          <Route
            path="/browse-questions/:id?"
            element={
              <BrowseQuestions
                questions={questions}
                setQuestions={setQuestions}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;