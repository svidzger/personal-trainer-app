import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';


function UpdateCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.params.data.firstname,
      lastname: props.params.data.lastname,
      streetaddress: props.params.data.streetaddress,
      postcode: props.params.data.postcode,
      city: props.params.data.city,
      email: props.params.data.email,
      phone: props.params.data.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCustomer(props.params.value, customer);
    handleClose();
  };

  const inputChanged = (event) => {
    event.preventDefault();
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Tooltip title="Update customer">
      <IconButton color="primary" size='small' onClick={handleClickOpen}>
        <UpdateIcon />
      </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
      <DialogActions>
          <IconButton color="error" onClick={handleClose}><CancelIcon /></IconButton>
        </DialogActions>
        <DialogTitle textAlign="center">Update customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="Firstname"
            fullWidth
            variant='standard'
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Lastname"
            fullWidth
            variant='standard'
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant='standard'
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            margin="dense"
            label="Postcode"
            fullWidth
            variant='standard'
          />
          <TextField
            name="city"
            value={customer.city}
            onChange={inputChanged}
            margin="dense"
            label="City"
            fullWidth
            variant='standard'
          />
          <TextField
            name="email"
            value={customer.email}
            onChange={inputChanged}
            margin="dense"
            label="Email"
            fullWidth
            variant='standard'
          />
          <TextField
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            margin="dense"
            label="Phone"
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

export default UpdateCustomer;
