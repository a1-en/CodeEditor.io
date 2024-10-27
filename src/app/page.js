// src/app/page.js
"use client"; // Add this line to mark the component as a client component

import { useState, useEffect } from 'react';
import { Container, Box, Typography, AppBar, Toolbar, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import CodeEditor from '../../components/CodeEditor';
import LivePreview from '../../components/LivePreview';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hello World</h1>');
  const [cssCode, setCssCode] = useState('h1 { color: #61dafb; }'); // Changed text color for dark theme
  const [jsCode, setJsCode] = useState('console.log("Hello from JavaScript!");');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>${htmlCode}</body>
          <script>${jsCode}</script>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // Create a dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Enable dark mode
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 2 }}>
      <AppBar position="static" sx={{ 
          background: 'linear-gradient(90deg, rgba(94,58,71,1) 0%, rgba(134,97,120,1) 99%, rgba(36,0,0,1) 100%, rgba(221,220,221,1) 100%)'
        }}>

          <Toolbar>
            <Typography variant="h6" color="inherit">
              Online Code Editor
            </Typography>
          </Toolbar>
        </AppBar>
        <Box mt={4} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 2 }}>
            <CodeEditor 
              htmlCode={htmlCode} 
              setHtmlCode={setHtmlCode} 
              cssCode={cssCode} 
              setCssCode={setCssCode} 
              jsCode={jsCode} 
              setJsCode={setJsCode} 
            />
          </Box>
          <Box sx={{ flex: 1, bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 2 }}>
            <LivePreview srcDoc={srcDoc} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
