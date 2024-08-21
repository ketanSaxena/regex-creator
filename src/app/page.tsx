'use client';

import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type TestResult = boolean | null;

export default function Home() {
  const [validationText, setValidationText] = useState<string>('');
  const [generatedRegex, setGeneratedRegex] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  const [testResult, setTestResult] = useState<TestResult>(null);
  const [error, setError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const handleGenerateRegex = async () => {
    try {
      const response = await axios.post('/api/generate-regex', { description: validationText });
      setGeneratedRegex(response.data.generated_regex);
      setTestResult(null); // Reset test result when regex is regenerated
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error generating regex:', error);
      setError('Failed to generate regex. Please try again.');
    }
  };

  const handleTestRegex = () => {
    try {
      // Extract the pattern and flags from the generated regex
      const regexParts = generatedRegex.match(/^\/(.+)\/([a-z]*)$/);
      if (!regexParts) {
        setError('Invalid regex format.');
        return;
      }

      const pattern = regexParts[1];
      const flags = regexParts[2];
      const regex = new RegExp(pattern, flags);
      setTestResult(regex.test(testString));
    } catch (e) {
      setError('Invalid regex.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleValidationTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValidationText(event.target.value);
  };

  const handleTestStringChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTestString(inputValue);

    if (!generatedRegex) {
      return;
    }

    try {
      // Extract the pattern and flags from the generated regex
      const regexParts = generatedRegex.match(/^\/(.+)\/([a-z]*)$/);
      if (!regexParts) {
        setError('Invalid regex format.');
        setTestResult(false);
        return;
      }

      const pattern = regexParts[1];
      const flags = regexParts[2];
      const regex = new RegExp(pattern, flags);
      
      setTestResult(regex.test(inputValue));
    } catch (e) {
      setError('Invalid regex.');
      setTestResult(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedRegex).then(() => {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 1000); // Hide tooltip after 1 second
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Regex Generator
          </Typography>
          <Box mt={2}>
            <TextField
              label="Enter your validation description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={validationText}
              onChange={handleValidationTextChange}
              inputProps={{ maxLength: 200 }}
              helperText={`${validationText.length}/200`}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateRegex}
            >
              Generate Regex
            </Button>
          </Box>

          {generatedRegex && (
              <Box mt={4}>
                <Typography variant="h6" display="flex" alignItems="center">
                  Generated Regex
                  <Tooltip
                    title="Copy to clipboard"
                    open={tooltipOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                  >
                    <IconButton
                      size="small"
                      sx={{ marginLeft: 1 }}
                      onClick={handleCopyToClipboard}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Paper style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1" style={{ fontFamily: 'monospace' }}>
                    {generatedRegex}
                  </Typography>
                </Paper>

                <Box mt={3}>
                  <TextField
                    label="Test your regex"
                    variant="outlined"
                    fullWidth
                    value={testString}
                    onChange={handleTestStringChange}
                    error={testResult !== null && testResult === false}
                  />
                </Box>
                <Box mt={1} display="flex" justifyContent="center" width="100%">
                  {testResult!== null && <Alert severity={testResult ? 'success' : 'error'} style={{ width: '100%' }}>
                    {testResult ? 'Test passed!' : 'Test failed.'}
                  </Alert>}
                </Box>
              </Box>
            )}

          {error && (
            <Box mt={3}>
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            </Box>
          )}
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Regex generated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
