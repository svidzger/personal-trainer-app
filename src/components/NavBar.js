import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import Calendar from './Calendar';
import Statistics from './Statistics';


function NavBar() {
  const [value, setValue] = useState("customers");
  const handleChange = (event, value) => {
    setValue(value);
  }

  const navBarTheme = createTheme({
    palette: {
      navbar: {
        backcolor: "#F4F1DE",
        tabcolor: "#FFFFFF",
        textselected: "#3D405B",
      },
    },
  });

  return (
    <ThemeProvider theme={navBarTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ mr: 2, color: '#FFFFFF', display: { xs: 'none', md: 'flex' } }}
            >
              Personal Trainer
            </Typography>
            <Tabs
              sx={{
                '&.Mui-selected': {
                  background: 'red'
                }
              }}
              textColor="navbar.tabcolor"
              indicatorColor="secondary"
              selectionFollowsFocus={true}
              value={value}
              centered={true}
              onChange={handleChange}
            >
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
    </ThemeProvider>
  );
}

export default NavBar;