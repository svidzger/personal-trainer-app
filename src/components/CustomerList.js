import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import AddCustomer from "./AddCustomer";
import UpdateCustomer from './UpdateCustomer'
import AddTraining from "./AddTraining";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(customer),
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setMsg('Customer added succesfully!')
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.log(err));
  }

  const deleteCustomer = (url) => {
    if (window.confirm('Are you sure?')) {
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchCustomers();
            setMsg('Customer deleted succesfully!')
          } else {
            alert('Something went wrong');
          }
        })
        .catch(err => console.error(err));
    }
  }

  const addTraining = (training) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setMsg('Training added succesfully')
          setOpen(true);
        } else {
          alert('Something went wrong')
        }
      })
      .catch(err => console.error(err))
  }

  const updateCustomer = (url, editedCustomer) => {
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(editedCustomer),
    })
      .then(response => {
        if (response.ok) {
          fetchCustomers();
          setMsg('Customer updated succesfully');
          setOpen(true);
        } else {
          alert('Something went wrong');
        }
      })
      .catch(err => console.error(err));
  }

  const columns = [
    { field: 'firstname', sortable: true, filter: true, floatingFilter: true },
    { field: 'lastname', sortable: true, filter: true, floatingFilter: true },
    { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true },
    { field: 'postcode', sortable: true, filter: true, floatingFilter: true, width: 120 },
    { field: 'city', sortable: true, filter: true, floatingFilter: true },
    { field: 'email', sortable: true, filter: true, floatingFilter: true },
    { field: 'phone', sortable: true, filter: true, floatingFilter: true },
    {
      headerName: '',
      field: 'links.0.href',
      width: 120,
      cellRendererFramework: params => (
        <AddTraining addTraining={addTraining} customer={params.data.links[0].href} />
      )
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 120,
      cellRendererFramework: params => (
        <UpdateCustomer updateCustomer={updateCustomer} params={params} />
      ),
    },
    {
      headerName: '',
      field: 'links.0.href',
      width: 120,
      cellRendererFramework: params => (
        <Button
          size="small"
          onClick={() => deleteCustomer(params.value)}
        >
          Delete
        </Button>
      )
    },
  ];

  return (
    <React.Fragment>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "80%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </React.Fragment>
  );
}

export default CustomerList;
