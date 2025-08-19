// components/LivePreview.js
import React, { useState } from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  Tooltip,
  Chip,
  Stack
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

const LivePreview = ({ srcDoc }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Force iframe refresh
    const iframe = document.querySelector('iframe[title="live-preview"]');
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    newWindow.document.write(srcDoc);
    newWindow.document.close();
  };

  const getDeviceSize = () => {
    if (isFullscreen) return '100%';
    return '100%';
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden', 
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.default', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" color="textPrimary">
            Live Preview
          </Typography>
          <Chip 
            label="Live" 
            size="small" 
            color="success" 
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh Preview">
            <IconButton 
              size="small" 
              onClick={handleRefresh}
              disabled={isLoading}
              sx={{ 
                color: isLoading ? 'text.disabled' : 'text.primary',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'rotate(180deg)' }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Open in New Tab">
            <IconButton size="small" onClick={openInNewTab}>
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton size="small" onClick={toggleFullscreen}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      
      <Box sx={{ 
        flex: 1, 
        position: 'relative', 
        height: getDeviceSize(),
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isLoading && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
            fontSize: '0.875rem'
          }}>
            Refreshing...
          </Box>
        )}
        
        <iframe
          title="live-preview"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          srcDoc={srcDoc}
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none', 
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
          }}
          onLoad={() => setIsLoading(false)}
        />
      </Box>
      
      {/* Device Preview Bar */}
      <Box sx={{ 
        p: 1, 
        bgcolor: 'background.default', 
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        justifyContent: 'center',
        gap: 1
      }}>
        <Chip 
          label="Desktop" 
          size="small" 
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        />
        <Chip 
          label="Responsive" 
          size="small" 
          variant="outlined"
          sx={{ fontSize: '0.75rem' }}
        />
      </Box>
    </Paper>
  );
};

export default LivePreview;
