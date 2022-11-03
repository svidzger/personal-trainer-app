import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const myEventsList = trainings.map((training) => {
    let date = new Date(training.date);
    const eventsDetails = {
      start: new Date(training.date),
      end: new Date(moment(date).add(training.duration, 'minutes')),
      title:
        training.activity +
        '/' +
        training.customer.firstname +
        ' ' +
        training.customer.lastname,
    };
    return eventsDetails;
  });

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    </div>
  );
}

export default TrainingCalendar;
