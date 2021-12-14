import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


function Statistics() {

  const [trainings, setTrainings] = useState([]);
  const _ = require("lodash");

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const data = _(trainings)
    .groupBy('activity')
    .map((activity, id) => ({
      activity: id,
      duration: _.sumBy(activity, 'duration')
    }))
    .value()

  return (
    <BarChart margin={{ top: 100, right: 0, left: 500, bottom: 0 }} width={2000} height={1000} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" />
      <YAxis dataKey="duration" >
        <Label
          angle={-90}
          value='Duration(min)'
          position='insideLeft'
          style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip />
      <Legend />
      <Bar name="Activity" dataKey="duration" fill="#8884d8" />
    </BarChart>
  );
}

export default Statistics;