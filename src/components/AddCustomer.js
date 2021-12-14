import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function AddCustomer(props) {
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
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  }

  const inputChanged = (event) => {
    event.preventDefault();
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  return (
    <React.Fragment>
      <Button style={{ marginTop: 4, marginRight: 1 }} color="success" variant="contained" startIcon={<AddCircleIcon />} onClick={handleClickOpen}>
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogActions>
          <IconButton color="error" onClick={handleClose}><CancelIcon /></IconButton>
        </DialogActions>
        <DialogTitle textAlign="center">New customer</DialogTitle>
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

export default AddCustomer;