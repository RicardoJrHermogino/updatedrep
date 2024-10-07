import React, { useState, useEffect } from 'react';
import { Grid, Typography, CssBaseline, Card, CardContent, Container, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, InputBase } from '@mui/material';
import { ArrowBack, Edit as EditIcon, Delete as DeleteIcon, AddCircle as AddCircleOutlineOutlinedIcon, Search as SearchIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../../../components/navbar';

const gradientStyle = {
  padding: "20px",
  borderRadius: "5px"
};

const AllScheduled = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch the user ID from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchTasks(storedUserId);
    }
  }, []);

  // Fetch tasks based on user ID
  const fetchTasks = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('There was an error fetching the tasks!', error);
    }
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task) => 
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleTaskDelete = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`http://localhost:3001/tasks/${selectedTask.id}`, {
        method: 'DELETE',
      });
      setTasks(prevTasks => prevTasks.filter(t => t.id !== selectedTask.id));
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const handleTaskEdit = (task) => {
    setEditedTask(task);
    setOpenDialog(true);
  };

  const handleEditConfirm = async () => {
    try {
      await fetch(`http://localhost:3001/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      const updatedTasks = tasks.map(t =>
        t.id === editedTask.id ? editedTask : t
      );
      setTasks(updatedTasks);
      setOpenDialog(false);
    } catch (error) {
      console.error('There was an error editing the task!', error);
    }
  };

  const handleEditCancel = () => {
    setEditedTask(null);
    setOpenDialog(false);
  };

  const handleAddNewTask = () => {
    router.push('/dashboard/task/task_components/predefined_list');
  };

  return (
    <>
          <Grid item xs={12} mb={4}>
          <Typography variant="h6" gutterBottom align="left"><strong> Scheduled Tasks</strong></Typography>
          </Grid>

          <Grid item xs={12} md={12} alignItems={'center'}>
            <Box display="flex" alignItems="center" mb={2}>
              <SearchIcon />
              <InputBase
                placeholder="Search Task…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
              />
            </Box>

            <Grid container spacing={2} mt={1}>
              {filteredTasks.map((task, index) => (
                <Grid item key={task.id} xs={12}>
                  <Card style={{ position: 'relative', zIndex: tasks.length - index }}>
                    <CardContent>
                      <Typography variant="subtitle1">{task.taskName}</Typography>
                      <Typography variant="body2" color="textSecondary"> {task.streetAddress}</Typography>
                      <Typography variant="body2" color="textSecondary"> {task.date}</Typography>
                      <Typography variant="body2" color="textSecondary"> {task.restrictedWeather}</Typography>
                      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <IconButton aria-label="edit" onClick={() => handleTaskEdit(task)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleTaskDelete(task)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: 90, right: 25, zIndex: 9999 }}>
            <IconButton aria-label="add" onClick={handleAddNewTask}>
                <AddCircleOutlineOutlinedIcon sx={{ fontSize: '54px' }} />
            </IconButton>
          </Box>

      <Dialog open={openDialog} onClose={handleEditCancel}>
        <DialogTitle>{editedTask ? 'Edit Task' : 'Confirm Delete'}</DialogTitle>
        <DialogContent>
          {editedTask ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                defaultValue={editedTask.taskName}
                onChange={(e) => setEditedTask({ ...editedTask, taskName: e.target.value })}
              />
              <TextField
                margin="dense"
                id="address"
                label="Address"
                fullWidth
                defaultValue={editedTask.streetAddress}
                onChange={(e) => setEditedTask({ ...editedTask, streetAddress: e.target.value })}
              />
              <TextField
                margin="dense"
                id="date"
                label="Date"
                fullWidth
                defaultValue={editedTask.date}
                onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
              />
              <TextField
                margin="dense"
                id="requiredWeather"
                label="Required Weather"
                fullWidth
                defaultValue={editedTask.restrictedWeather}
                onChange={(e) => setEditedTask({ ...editedTask, restrictedWeather: e.target.value })}
              />
            </>
          ) : (
            <Typography>Are you sure you want to delete {selectedTask?.taskName}?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={editedTask ? handleEditCancel : handleDeleteCancel}>Cancel</Button>
          <Button onClick={editedTask ? handleEditConfirm : handleDeleteConfirm} color="error">
            {editedTask ? 'Save' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllScheduled;
