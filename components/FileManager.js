import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Code as CodeIcon,
  Style as StyleIcon,
  Code as JsIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const FileManager = ({ 
  files, 
  currentFile, 
  onFileSelect, 
  onFileCreate, 
  onFileDelete, 
  onFileRename,
  onFileSave 
}) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('html');

  const getFileIcon = (type) => {
    switch (type) {
      case 'html':
        return <CodeIcon color="primary" />;
      case 'css':
        return <StyleIcon color="secondary" />;
      case 'javascript':
      case 'js':
        return <JsIcon color="warning" />;
      default:
        return <FileIcon />;
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'html':
        return 'primary';
      case 'css':
        return 'secondary';
      case 'javascript':
      case 'js':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const fileName = newFileName.includes('.') ? newFileName : `${newFileName}.${newFileType}`;
      onFileCreate(fileName, newFileType);
      setNewFileName('');
      setNewFileType('html');
      setCreateDialogOpen(false);
    }
  };

  const handleRenameFile = () => {
    if (newFileName.trim() && editingFile !== null) {
      onFileRename(editingFile, newFileName);
      setNewFileName('');
      setEditingFile(null);
      setRenameDialogOpen(false);
    }
  };

  const openRenameDialog = (fileIndex) => {
    setEditingFile(fileIndex);
    setNewFileName(files[fileIndex].name);
    setRenameDialogOpen(true);
  };

  const getFileTypeLabel = (type) => {
    switch (type) {
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'javascript':
      case 'js':
        return 'JavaScript';
      default:
        return type.toUpperCase();
    }
  };

  return (
    <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Files
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
          size="small"
          fullWidth
        >
          New File
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List dense>
          {files.map((file, index) => (
            <React.Fragment key={index}>
              <ListItem
                selected={currentFile === index}
                onClick={() => onFileSelect(index)}
                sx={{
                  cursor: 'pointer',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {getFileIcon(file.type)}
                </ListItemIcon>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" component="div" noWrap>
                    {file.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Chip
                      label={getFileTypeLabel(file.type)}
                      size="small"
                      color={getFileColor(file.type)}
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: 20 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {file.content.length} chars
                    </Typography>
                  </Box>
                </Box>
                <ListItemSecondaryAction>
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Rename">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          openRenameDialog(index);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFileDelete(index);
                        }}
                        disabled={files.length <= 1}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
              {index < files.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Create File Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New File</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="File Name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              fullWidth
              size="small"
              placeholder="Enter file name"
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="File Type"
              value={newFileType}
              onChange={(e) => setNewFileType(e.target.value)}
              fullWidth
              size="small"
              SelectProps={{
                native: true,
              }}
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateFile} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Rename File Dialog */}
      <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rename File</DialogTitle>
        <DialogContent>
          <TextField
            label="New File Name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            fullWidth
            size="small"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRenameFile} variant="contained">Rename</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default FileManager;
