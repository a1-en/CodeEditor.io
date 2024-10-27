// components/LivePreview.js
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const LivePreview = ({ srcDoc }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Typography variant="h6" color="textPrimary">
          Live Preview
        </Typography>
      </Box>
      <Box sx={{ flex: 1, position: 'relative', height: '400px' }}> {/* Set a flexible height for the preview area */}
        <iframe
          title="live-preview"
          sandbox="allow-scripts allow-same-origin"
          srcDoc={srcDoc}
          style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'black' }} // Added background color for iframe
        />
      </Box>
    </Paper>
  );
};

export default LivePreview;
