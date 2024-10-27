// components/CodeEditor.js
"use client"; // Mark as a client component

import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; 
import 'codemirror/mode/htmlmixed/htmlmixed'; 
import 'codemirror/mode/css/css'; 
import 'codemirror/mode/javascript/javascript'; 

const CodeEditor = ({ htmlCode, setHtmlCode, cssCode, setCssCode, jsCode, setJsCode }) => {
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
          setHtmlCode(value); // Should work now
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
          setCssCode(value); // Should work now
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
          setJsCode(value); // Should work now
        }}
      />
    </div>
  );
};

export default CodeEditor;
