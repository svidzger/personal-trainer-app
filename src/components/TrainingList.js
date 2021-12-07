import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: 'date', sortable: true, filter: true, floatingFilter: true },
    { field: 'duration', sortable: true, filter: true, floatingFilter: true },
    { field: 'activity', sortable: true, filter: true, floatingFilter: true },
    {
      //FIX CUSTOMER NAME. ADD LAST NAME!
      headerName: 'Customer',
      field: 'customer.firstname',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ];

  return (
    <React.Fragment>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "60%", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          animateRows={true}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
        />
      </div>
    </React.Fragment>
  );
}

export default TrainingList;
