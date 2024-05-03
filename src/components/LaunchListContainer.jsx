import React, { useState, useEffect } from 'react';
import LaunchList from './LaunchList';

const LaunchListContainer = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    // Fetch launches from an API or perform any other necessary data retrieval
    const fetchedLaunches = [
      { id: 1, name: 'Launch 1', flightNumber: 123, launchDate: '2024-05-01' },
      { id: 2, name: 'Launch 2', flightNumber: 456, launchDate: '2024-05-02' },
      { id: 3, name: 'Launch 3', flightNumber: 789, launchDate: '2024-05-03' },
    ];
    setLaunches(fetchedLaunches);
  }, []);

  const sortByLaunchDate = () => {
    // Sort launches by launch date
    const sortedLaunches = [...launches].sort((a, b) => a.launchDate.localeCompare(b.launchDate));
    setLaunches(sortedLaunches);
  };

  const sortByFlightNumber = () => {
    // Sort launches by flight number
    const sortedLaunches = [...launches].sort((a, b) => a.flightNumber - b.flightNumber);
    setLaunches(sortedLaunches);
  };

  const sortByName = () => {
    // Sort launches by name
    const sortedLaunches = [...launches].sort((a, b) => a.name.localeCompare(b.name));
    setLaunches(sortedLaunches);
  };

  return (
    <div>
      <h1>Launch List Container</h1>
      <LaunchList
        launches={launches}
        sortByLaunchDate={sortByLaunchDate}
        sortByFlightNumber={sortByFlightNumber}
        sortByName={sortByName}
      />
    </div>
  );
};

export default LaunchListContainer;