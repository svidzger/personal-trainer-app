import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: '',
    duration: '',
    date: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  }

  const inputChanged = (event) => {
    event.preventDefault();
    setTraining({ ...training, [event.target.name]: event.target.value })
  }

  return (
    <React.Fragment>
      <Button variant="otlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField 
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth
            variant='standard'
          />
          <TextField 
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth
            variant='standard'
          />
          <TextField 
            name="date"
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddTraining;