"use client"; // Mark as a client component

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CodeMirror to avoid SSR issues
const CodeMirror = dynamic(() => import('react-codemirror2').then(mod => mod.Controlled), { ssr: false });

const CodeEditor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamically import CodeMirror assets on client-side only
      require('codemirror/lib/codemirror.css');
      require('codemirror/theme/material.css');
      require('codemirror/mode/htmlmixed/htmlmixed');
      require('codemirror/mode/css/css');
      require('codemirror/mode/javascript/javascript');
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null; // Render nothing on the server

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '16px' }}>
      <h3>HTML</h3>
      <CodeMirror
        value={htmlCode}
        options={{
          mode: 'htmlmixed',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setHtmlCode(value);
        }}
      />
      <h3>CSS</h3>
      <CodeMirror
        value={cssCode}
        options={{
          mode: 'css',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCssCode(value);
        }}
      />
      <h3>JavaScript</h3>
      <CodeMirror
        value={jsCode}
        options={{
          mode: 'javascript',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setJsCode(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
