"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Tabs, Tab, Typography } from '@mui/material';

// Dynamically import CodeMirror to avoid SSR issues
const CodeMirror = dynamic(() => import('react-codemirror2').then(mod => mod.Controlled), { ssr: false });

const CodeEditor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode, fontSize = 14 }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import CodeMirror assets on client-side only
      require('codemirror/lib/codemirror.css');
      require('codemirror/theme/material.css');
      require('codemirror/theme/dracula.css');
      require('codemirror/theme/monokai.css');
      require('codemirror/theme/solarized.css');
      require('codemirror/mode/htmlmixed/htmlmixed');
      require('codemirror/mode/css/css');
      require('codemirror/mode/javascript/javascript');
      require('codemirror/addon/edit/closebrackets');
      require('codemirror/addon/edit/matchbrackets');
      require('codemirror/addon/fold/foldcode');
      require('codemirror/addon/fold/foldgutter');
      require('codemirror/addon/fold/brace-fold');
      require('codemirror/addon/fold/xml-fold');
      require('codemirror/addon/fold/comment-fold');
      require('codemirror/addon/fold/foldgutter.css');
      setIsMounted(true);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isMounted) return null; // Render nothing on the server

  const commonOptions = {
    theme: 'material',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Tab': function(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection('add');
        } else {
          cm.replaceSelection('  ', 'end');
        }
      }
    }
  };

  const renderEditor = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box sx={{ height: '100%' }}>
            <Typography variant="subtitle2" sx={{ p: 1, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              HTML
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <CodeMirror
                value={htmlCode}
                options={{
                  ...commonOptions,
                  mode: 'htmlmixed',
                  fontSize: `${fontSize}px`,
                }}
                onBeforeChange={(editor, data, value) => {
                  setHtmlCode(value);
                }}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ height: '100%' }}>
            <Typography variant="subtitle2" sx={{ p: 1, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              CSS
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <CodeMirror
                value={cssCode}
                options={{
                  ...commonOptions,
                  mode: 'css',
                  fontSize: `${fontSize}px`,
                }}
                onBeforeChange={(editor, data, value) => {
                  setCssCode(value);
                }}
              />
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ height: '100%' }}>
            <Typography variant="subtitle2" sx={{ p: 1, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
              JavaScript
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <CodeMirror
                value={jsCode}
                options={{
                  ...commonOptions,
                  mode: 'javascript',
                  fontSize: `${fontSize}px`,
                }}
                onBeforeChange={(editor, data, value) => {
                  setJsCode(value);
                }}
              />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        variant="fullWidth"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            minHeight: '48px',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none'
          }
        }}
      >
        <Tab label="HTML" />
        <Tab label="CSS" />
        <Tab label="JavaScript" />
      </Tabs>
      
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {renderEditor()}
      </Box>
    </Box>
  );
};

export default CodeEditor;
