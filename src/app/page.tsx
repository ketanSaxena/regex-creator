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
  InputAdornment,
  AppBar,
  Toolbar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { AccountCircle, GitHub } from '@mui/icons-material';

type TestResult = boolean | null;

export default function Home() {
  const [validationText, setValidationText] = useState<string>('');
  const [generatedRegex, setGeneratedRegex] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  const [testResult, setTestResult] = useState<TestResult>(null);
  const [error, setError] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);

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
        flexDirection: 'column',
        background: 'linear-gradient(to right, #6C5B7B, #2C3E50)',
      }}
    >
      <AppBar position="static">
      <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Online Regex Generator
          </Typography>
          <Typography variant="body1" style={{ marginRight: "8px" }}>
            App Info
          </Typography>
          <IconButton
            color="inherit"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              component="a"
              href="https://github.com/ketanSaxena"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <GitHub fontSize="small" />
              </ListItemIcon>
              <ListItemText>Git Repository</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component="a"
              href="https://www.linkedin.com/in/ketan-saxena-157b2878/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>Author Info</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{marginTop: '2rem'}}>
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

          
              <Box mt={4}>
                <Typography variant="h6" display="flex" alignItems="center">
                  Generated Regex
                  <Tooltip
                    title="Copied to clipboard"
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
                <Paper style={{ padding: '10px', backgroundColor: '#f5f5f5', minHeight: '40px' }}>
                  <Typography variant={generatedRegex ? 'body1' : 'caption'} style={{ fontFamily: 'monospace' }}>
                    {generatedRegex || 'Generated regex will appear here...'}
                  </Typography>
                </Paper>

                <Box mt={3}>
                  <TextField
                    label="Test your regex"
                    variant="outlined"
                    fullWidth
                    disabled={generatedRegex.length === 0}
                    value={testString}
                    onChange={handleTestStringChange}
                    color={testString.length ? (testResult === false ? 'error' : 'success') : 'info'}
                    InputProps={{
                      endAdornment: generatedRegex.length && testString.length ? (<InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        {testResult === false ? <ErrorIcon color='error' /> : <CheckCircleIcon color='success'/>}
                      </IconButton>
                    </InputAdornment>) : null
                    }}
                  />
                </Box>
                {/* <Box mt={1} display="flex" justifyContent="center" width="100%">
                  {testResult!== null && testString && <Alert severity={testResult ? 'success' : 'error'} style={{ width: '100%' }}>
                    {testResult ? 'Test passed!' : 'Test failed.'}
                  </Alert>}
                </Box> */}
              </Box>
            

          
            <Box mt={3}>
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            </Box>
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
