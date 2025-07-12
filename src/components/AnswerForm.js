import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Stack, Box } from '@mui/material';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

const AnswerForm = ({ onSubmit, onCancel }) => {
  const [answer, setAnswer] = useState('');
  const quillRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.length < 30) {
      alert('Answer must be at least 30 characters');
      return;
    }
    onSubmit({
      id: Date.now(),
      content: answer,
      createdAt: new Date().toISOString(),
      votes: 0
    });
  };

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={answer}
          onChange={setAnswer}
          modules={modules}
          style={{ 
            minHeight: '150px',
            backgroundColor: 'white',
            marginBottom: '1rem'
          }}
        />
        <Stack direction="row" spacing={2}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={answer.length < 30}
          >
            Post Answer
          </Button>
          <Button 
            variant="outlined" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AnswerForm;