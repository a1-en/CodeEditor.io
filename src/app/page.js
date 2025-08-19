// src/app/page.js
"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  AppBar, 
  Toolbar, 
  CssBaseline, 
  createTheme, 
  ThemeProvider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Code as CodeIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon,
  Folder as FolderIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  GitHub as GitHubIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import CodeEditor from '../../components/CodeEditor';
import LivePreview from '../../components/LivePreview';
import FileManager from '../../components/FileManager';
import Console from '../../components/Console';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hello World</h1>\n<p>Welcome to the Online Code Editor!</p>');
  const [cssCode, setCssCode] = useState('body {\n  font-family: Arial, sans-serif;\n  margin: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n}\n\nh1 {\n  color: #fff;\n  text-align: center;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  color: #fff;\n  text-align: center;\n  font-size: 18px;\n}');
  const [jsCode, setJsCode] = useState('// Add your JavaScript code here\nconsole.log("Hello from JavaScript!");\n\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("DOM fully loaded!");\n});');
  const [srcDoc, setSrcDoc] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [files, setFiles] = useState([
    { name: 'index.html', type: 'html', content: '<h1>Hello World</h1>\n<p>Welcome to the Online Code Editor!</p>' },
    { name: 'styles.css', type: 'css', content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  min-height: 100vh;\n}\n\nh1 {\n  color: #fff;\n  text-align: center;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n\np {\n  color: #fff;\n  text-align: center;\n  font-size: 18px;\n}' },
    { name: 'script.js', type: 'javascript', content: '// Add your JavaScript code here\nconsole.log("Hello from JavaScript!");\n\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("DOM fully loaded!");\n});' }
  ]);
  const [currentFile, setCurrentFile] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Use a ref to generate unique IDs
  const idCounter = useRef(0);

  // Create themes
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#667eea',
      },
      secondary: {
        main: '#764ba2',
      },
      background: {
        default: '#0a0a0a',
        paper: '#1a1a1a',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#667eea',
      },
      secondary: {
        main: '#764ba2',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>${htmlCode}</body>
          <script>
            // Override console methods to capture output
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            
            console.log = function(...args) {
              originalLog.apply(console, args);
              window.parent.postMessage({ type: 'console', level: 'log', message: args.join(' ') }, '*');
            };
            
            console.error = function(...args) {
              originalError.apply(console, args);
              window.parent.postMessage({ type: 'console', level: 'error', message: args.join(' ') }, '*');
            };
            
            console.warn = function(...args) {
              originalWarn.apply(console, args);
              window.parent.postMessage({ type: 'console', level: 'warn', message: args.join(' ') }, '*');
            };
            
            ${jsCode}
          </script>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'console') {
        setConsoleOutput(prev => [...prev, {
          id: ++idCounter.current,
          level: event.data.level,
          message: event.data.message,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileSelect = (index) => {
    setCurrentFile(index);
    const file = files[index];
    if (file.type === 'html') setHtmlCode(file.content);
    else if (file.type === 'css') setCssCode(file.content);
    else if (file.type === 'javascript') setJsCode(file.content);
  };

  const handleFileCreate = (fileName, fileType) => {
    const newFile = {
      name: fileName,
      type: fileType,
      content: ''
    };
    setFiles([...files, newFile]);
    setCurrentFile(files.length);
    showSnackbar('New file created!', 'success');
  };

  const handleFileDelete = (index) => {
    if (files.length > 1) {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      if (currentFile >= index) setCurrentFile(Math.max(0, currentFile - 1));
      showSnackbar('File deleted!', 'info');
    }
  };

  const handleFileRename = (index, newName) => {
    const newFiles = [...files];
    newFiles[index].name = newName;
    setFiles(newFiles);
    showSnackbar('File renamed successfully!', 'success');
  };

  const saveCurrentFile = () => {
    const newFiles = [...files];
    if (currentFile === 0) newFiles[0].content = htmlCode;
    else if (currentFile === 1) newFiles[1].content = cssCode;
    else if (currentFile === 2) newFiles[2].content = jsCode;
    setFiles(newFiles);
    showSnackbar('File saved successfully!', 'success');
  };

  const exportCode = () => {
    const htmlBlob = new Blob([htmlCode], { type: 'text/html' });
    const cssBlob = new Blob([cssCode], { type: 'text/css' });
    const jsBlob = new Blob([jsCode], { type: 'text/javascript' });
    
    const htmlUrl = URL.createObjectURL(htmlBlob);
    const cssUrl = URL.createObjectURL(cssBlob);
    const jsUrl = URL.createObjectURL(jsBlob);
    
    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'index.html';
    htmlLink.click();
    
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = 'styles.css';
    cssLink.click();
    
    const jsLink = document.createElement('a');
    jsLink.href = jsUrl;
    jsLink.download = 'script.js';
    jsLink.click();
    
    URL.revokeObjectURL(htmlUrl);
    URL.revokeObjectURL(cssUrl);
    URL.revokeObjectURL(jsUrl);
    
    showSnackbar('Code exported successfully!', 'success');
  };

  const shareCode = () => {
    const codeData = {
      html: htmlCode,
      css: cssCode,
      js: jsCode
    };
    const encoded = btoa(JSON.stringify(codeData));
    const shareUrl = `${window.location.origin}?code=${encoded}`;
    
    navigator.clipboard.writeText(shareUrl);
    showSnackbar('Share link copied to clipboard!', 'success');
  };

  const clearConsole = () => {
    setConsoleOutput([]);
    idCounter.current = 0; // Reset the counter when clearing console
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const codeSnippets = [
    {
      name: 'Responsive Card',
      html: '<div class="card">\n  <h2>Card Title</h2>\n  <p>This is a responsive card component.</p>\n  <button class="btn">Click Me</button>\n</div>',
      css: '.card {\n  background: white;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  max-width: 300px;\n  margin: 20px auto;\n}\n\n.btn {\n  background: #667eea;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 5px;\n  cursor: pointer;\n}',
      js: 'document.querySelector(".btn").addEventListener("click", function() {\n  alert("Button clicked!");\n});'
    },
    {
      name: 'Animated Button',
      html: '<button class="animated-btn">Hover Me</button>',
      css: '.animated-btn {\n  padding: 15px 30px;\n  font-size: 16px;\n  border: none;\n  background: linear-gradient(45deg, #667eea, #764ba2);\n  color: white;\n  border-radius: 25px;\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n\n.animated-btn:hover {\n  transform: scale(1.1);\n}',
      js: '// Animation is handled by CSS'
    },
    {
      name: 'Todo List',
      html: '<div class="todo-app">\n  <h2>Todo List</h2>\n  <input type="text" id="todoInput" placeholder="Add new task...">\n  <button onclick="addTodo()">Add</button>\n  <ul id="todoList"></ul>\n</div>',
      css: '.todo-app {\n  max-width: 400px;\n  margin: 20px auto;\n  padding: 20px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}\n\ninput, button {\n  padding: 10px;\n  margin: 5px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\n\nbutton {\n  background: #667eea;\n  color: white;\n  border: none;\n  cursor: pointer;\n}',
      js: 'function addTodo() {\n  const input = document.getElementById("todoInput");\n  const list = document.getElementById("todoList");\n  if (input.value.trim()) {\n    const li = document.createElement("li");\n    li.textContent = input.value;\n    list.appendChild(li);\n    input.value = "";\n  }\n}'
    }
  ];

  const applySnippet = (snippet) => {
    setHtmlCode(snippet.html);
    setCssCode(snippet.css);
    setJsCode(snippet.js);
    setSnippetsOpen(false);
    showSnackbar('Snippet applied successfully!', 'success');
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ 
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          boxShadow: 3
        }}>
          <Toolbar>
            <CodeIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Online Code Editor
            </Typography>
            <Tooltip title="Toggle Theme">
              <IconButton color="inherit" onClick={toggleTheme}>
                {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit" onClick={() => setSettingsOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Code Snippets">
              <IconButton color="inherit" onClick={() => setSnippetsOpen(true)}>
                <CodeIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
          <Grid container spacing={3} sx={{ height: 'calc(100vh - 140px)' }}>
            {/* Left Sidebar - File Manager */}
            <Grid item xs={12} md={2}>
              <FileManager
                files={files}
                currentFile={currentFile}
                onFileSelect={handleFileSelect}
                onFileCreate={handleFileCreate}
                onFileDelete={handleFileDelete}
                onFileRename={handleFileRename}
                onFileSave={saveCurrentFile}
              />
            </Grid>

            {/* Center Panel - Code Editor */}
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Code Editor
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={files[currentFile]?.name || 'Untitled'}
                      color="primary"
                      variant="filled"
                      size="small"
                    />
                    <Chip
                      label={files[currentFile]?.type?.toUpperCase() || 'TEXT'}
                      color="secondary"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <CodeEditor 
                    htmlCode={htmlCode} 
                    setHtmlCode={setHtmlCode} 
                    cssCode={cssCode} 
                    setCssCode={setCssCode} 
                    jsCode={jsCode} 
                    setJsCode={setJsCode}
                    fontSize={fontSize}
                  />
                </Box>

                <Box sx={{ borderTop: 1, borderColor: 'divider', p: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={saveCurrentFile}
                    size="small"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportCode}
                    size="small"
                  >
                    Export
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    onClick={shareCode}
                    size="small"
                  >
                    Share
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Right Panel - Preview and Console */}
            <Grid item xs={12} md={5}>
              <Grid container spacing={2} sx={{ height: '100%' }}>
                {/* Live Preview */}
                <Grid item xs={12} sx={{ height: '60%' }}>
                  <LivePreview srcDoc={srcDoc} />
                </Grid>

                {/* Console Output */}
                <Grid item xs={12} sx={{ height: '40%' }}>
                  <Console 
                    consoleOutput={consoleOutput}
                    onClear={clearConsole}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Font Size
            </Typography>
            <TextField
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              inputProps={{ min: 10, max: 24 }}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snippets Dialog */}
      <Dialog open={snippetsOpen} onClose={() => setSnippetsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Code Snippets</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {codeSnippets.map((snippet, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {snippet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Click to apply this code snippet to your editor.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => applySnippet(snippet)}
                      startIcon={<CodeIcon />}
                    >
                      Apply Snippet
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSnippetsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
