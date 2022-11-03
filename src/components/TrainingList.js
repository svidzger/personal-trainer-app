import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import MuiAlert from '@mui/material/Alert';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + id, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            fetchTrainings();
            setMsg('Training deleted succesfully!');
            setOpen(true);
          } else {
            alert('Something went wrong');
          }
        })
        .catch(err => console.error(err));
    }
  }

  const columns = [
    {
      field: 'date', sortable: true, filter: true, floatingFilter: true,
      cellRenderer: params => { return moment(params.value).format('DD/MM/YYYY HH:mm') }
    },
    { field: 'duration', sortable: true, filter: true, floatingFilter: true },
    { field: 'activity', sortable: true, filter: true, floatingFilter: true },
    {
      headerName: 'Customer',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueGetter: params => {
        if (params.data.customer === null) {
          return ''
        }
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
      }
    },
    {
      headerName: '',
      field: 'id',
      width: 70,
      cellRendererFramework: params => (
        <Tooltip title="Delete">
          <IconButton
            color="error"
            size="small"
            onClick={() => deleteTraining(params.value)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    },
  ];

  return (
    <React.Fragment>
      <div
        className="ag-theme-material"
        style={{ height: 650, width: "60%", margin: "auto", marginTop: "60px" }}
      >
        <AgGridReact
          defaultColDef={{
            flex: 1,
            resizable: true,
          }}
          rowData={trainings}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
          suppressRowHoverHighlight={true}
        />
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }} message={msg}>
          {msg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default TrainingList;
