import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmojiPicker from 'emoji-picker-react';
import {
  TextField,
  Autocomplete,
  Chip,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  Alert,
  Popover,
  IconButton
} from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Image, Link, FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';

const FormContainer = styled(Paper)`
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
`;

// Custom image upload handler
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;

    // Replace this with your actual image upload logic
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };
};

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'emoji'],
      [{ 'align': [] }],
      ['clean']
    ],
    handlers: {
      image: imageHandler,
      emoji: () => {} // Will be handled by our custom emoji picker
    }
  }
};

const formats = [
  'header',
  'bold', 'italic', 'strike',
  'list', 'bullet',
  'link', 'image', 'emoji',
  'align'
];

const tagOptions = [
  'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB',
  'CSS', 'HTML', 'JWT', 'Authentication', 'Redux',
  'TypeScript', 'Next.js', 'GraphQL', 'REST', 'Docker'
];

const MIN_DESCRIPTION_LENGTH = 30;
const MAX_TAGS = 5;

const AskQuestionForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const handleEmojiClick = (emojiData) => {
    const editor = quillRef.current?.getEditor();
    const range = editor?.getSelection();
    if (range) {
      editor?.insertText(range.index, emojiData.emoji);
    }
    setEmojiAnchor(null);
  };

  const handleFormSubmit = async (formData) => {
    if (!description || description.length < MIN_DESCRIPTION_LENGTH) {
      setSubmitError(`Description must be at least ${MIN_DESCRIPTION_LENGTH} characters`);
      return;
    }

    if (selectedTags.length === 0) {
      setSubmitError('Please select at least one tag');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const questionData = {
        title: formData.title,
        description,
        tags: selectedTags,
        createdAt: new Date().toISOString()
      };

      if (onSubmit) {
        await onSubmit(questionData);
      }
      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h4" gutterBottom>
        Ask a Question
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...register('title', { 
              required: 'Title is required',
              maxLength: {
                value: 150,
                message: 'Title should not exceed 150 characters'
              },
              minLength: {
                value: 10,
                message: 'Title should be at least 10 characters'
              }
            })}
            label="Question Title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            placeholder="What's your programming question?"
          />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Detailed Description
            </Typography>
            
            {/* Custom Toolbar Buttons */}
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <IconButton size="small" onClick={() => setEmojiAnchor(document.getElementById('editor-toolbar'))}>
                <span role="img" aria-label="emoji">😀</span>
              </IconButton>
              <IconButton size="small" onClick={() => quillRef.current?.getEditor().format('align', 'left')}>
                <FormatAlignLeft fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => quillRef.current?.getEditor().format('align', 'center')}>
                <FormatAlignCenter fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => quillRef.current?.getEditor().format('align', 'right')}>
                <FormatAlignRight fontSize="small" />
              </IconButton>
            </Stack>

            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              style={{ 
                minHeight: '200px',
                backgroundColor: 'white',
                borderRadius: '4px',
                marginBottom: '8px'
              }}
              id="editor-toolbar"
            />
            
            <Popover
              open={Boolean(emojiAnchor)}
              anchorEl={emojiAnchor}
              onClose={() => setEmojiAnchor(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={350} />
            </Popover>

            <Typography 
              variant="caption" 
              color={
                description.length < MIN_DESCRIPTION_LENGTH ? 'error' : 'textSecondary'
              }
            >
              {description.length} / {MIN_DESCRIPTION_LENGTH} minimum characters
              {description.length < MIN_DESCRIPTION_LENGTH && ' (more details needed)'}
            </Typography>
          </Box>

          <Autocomplete
            multiple
            options={tagOptions}
            value={selectedTags}
            onChange={(_, newValue) => {
              if (newValue.length <= MAX_TAGS) {
                setSelectedTags(newValue);
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip 
                  label={option} 
                  {...getTagProps({ index })}
                  size="small"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Select up to 5 tags"
                helperText={`${selectedTags.length} / ${MAX_TAGS} tags selected`}
              />
            )}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                isSubmitting || 
                !description || 
                description.length < MIN_DESCRIPTION_LENGTH ||
                selectedTags.length === 0
              }
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? 'Posting Question...' : 'Post Question'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormContainer>
  );
};

export default AskQuestionForm;