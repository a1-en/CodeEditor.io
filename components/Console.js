import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField
} from '@mui/material';
import {
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Console = ({ consoleOutput, onClear }) => {
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <ErrorIcon color="error" fontSize="small" />;
      case 'warn':
        return <WarningIcon color="warning" fontSize="small" />;
      case 'log':
        return <InfoIcon color="info" fontSize="small" />;
      default:
        return <InfoIcon color="default" fontSize="small" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'error.main';
      case 'warn':
        return 'warning.main';
      case 'log':
        return 'info.main';
      default:
        return 'text.primary';
    }
  };

  const filteredOutput = consoleOutput.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelCount = (level) => {
    return consoleOutput.filter(log => log.level === level).length;
  };

  const totalCount = consoleOutput.length;

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">
            Console Output
          </Typography>
          <Chip 
            label={totalCount} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Tooltip title="Clear Console">
            <IconButton size="small" onClick={onClear}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Filters and Search */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={filterLevel}
              label="Level"
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <MenuItem value="all">All ({totalCount})</MenuItem>
              <MenuItem value="log">Log ({getLevelCount('log')})</MenuItem>
              <MenuItem value="warn">Warn ({getLevelCount('warn')})</MenuItem>
              <MenuItem value="error">Error ({getLevelCount('error')})</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            size="small"
            placeholder="Search console output..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Box>

      {/* Console Output */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredOutput.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            p: 3
          }}>
            {consoleOutput.length === 0 ? (
              <>
                <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Console output will appear here...
                </Typography>
                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Run your JavaScript code to see console logs
                </Typography>
              </>
            ) : (
              <>
                <FilterIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No console output matches your filters
                </Typography>
                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Try adjusting the level filter or search term
                </Typography>
              </>
            )}
          </Box>
        ) : (
          <List dense>
            {filteredOutput.map((log, index) => (
              <React.Fragment key={log.id}>
                <ListItem sx={{ 
                  py: 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <Box sx={{ mr: 1, mt: 0.5 }}>
                      {getLevelIcon(log.level)}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mr: 1, fontFamily: 'monospace' }}
                        >
                          {log.timestamp}
                        </Typography>
                        <Chip
                          label={log.level.toUpperCase()}
                          size="small"
                          color={log.level === 'error' ? 'error' : 
                                 log.level === 'warn' ? 'warning' : 'info'}
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: getLevelColor(log.level),
                          wordBreak: 'break-word'
                        }}
                      >
                        {log.message}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
                {index < filteredOutput.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Status Bar */}
      <Box sx={{ 
        p: 1, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="caption" color="text.secondary">
          {filteredOutput.length} of {totalCount} messages
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip 
            label={`Log: ${getLevelCount('log')}`} 
            size="small" 
            color="info" 
            variant="outlined"
          />
          <Chip 
            label={`Warn: ${getLevelCount('warn')}`} 
            size="small" 
            color="warning" 
            variant="outlined"
          />
          <Chip 
            label={`Error: ${getLevelCount('error')}`} 
            size="small" 
            color="error" 
            variant="outlined"
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default Console;
