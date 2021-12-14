import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from '@mui/lab/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: props.customer,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  };

  const inputChanged = (event) => {
    event.preventDefault();
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Tooltip title="Add training">
        <IconButton variant="contained" color="success" onClick={handleClickOpen}>
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <IconButton color="error" onClick={handleClose}><CancelIcon /></IconButton>
        </DialogActions>
        <DialogTitle textAlign="center">New Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date and Time"
              value={training.date}
              onChange={(date) => {
                const formatDate = date.toISOString();
                setTraining({ ...training, date: formatDate });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
            label="Duration (min)"
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddTraining;