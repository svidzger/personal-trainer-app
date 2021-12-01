import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar';
import Statistics from './Statistics';
import { Typography } from '@mui/material';

function NavBar() {
  const [value, setValue] = useState("customers");
  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">Personal Trainer App</Typography>
          <Tabs value={value} centered={true} onChange={handleChange}>
            <Tab
              value="customers"
              label="Customers"
              icon={<PeopleIcon />}
            />
            <Tab
              value="trainings"
              label="Trainings"
              icon={<FitnessCenterIcon />}
            />
            <Tab
              value="calendar"
              label="Calendar"
              icon={<CalendarTodayIcon />}
            />
            <Tab
              value="statistics"
              label="Statistics"
              icon={<BarChartIcon />}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      {value === "customers" && <CustomerList />}
      {value === "trainings" && <TrainingList />}
      {value === "calendar" && <Calendar />}
      {value === "statistics" && <Statistics />}
    </Box>
  );
}

export default NavBar;