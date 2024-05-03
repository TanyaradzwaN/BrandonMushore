import React, { useState, useEffect } from 'react';

const LaunchDetails = ({ launch }) => {
  const [rocket, setRocket] = useState(null);
  const [launchPad, setLaunchPad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRocketDetails = () => {
      fetch(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`)
        .then(response => response.json())
        .then(data => setRocket(data))
        .catch(error => setError(error));
    };

    const fetchLaunchPadDetails = () => {
      fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`)
        .then(response => response.json())
        .then(data => setLaunchPad(data))
        .catch(error => setError(error));
    };

    fetchRocketDetails();
    fetchLaunchPadDetails();
  }, [launch]);

  if (error) {
    return <div>Error fetching launch details: {error.message}</div>;
  }

  return (
    <div>
      <h2>Launch Details</h2>
      <p>Name: {launch.name}</p>
      <p>Details: {launch.details}</p>
      <p>Success Rate: {launch.success_rate_pct}%</p>
      <p>Upcoming: {launch.upcoming ? 'Yes' : 'No'}</p>
      <p>Launch Date: {launch.date_utc}</p>
      
      <img src={launch.links.patch.small} alt="Launch Patch" />

      {launchPad && (
        <p>
          Launch Pad Coordinates: {launchPad.latitude}, {launchPad.longitude}
        </p>
      )}

      {/* Embed YouTube video here */}

      {rocket && (
        <div>
          <p>Rocket Name: {rocket.name}</p>
          {/* Other rocket details */}
        </div>
      )}
    </div>
  );
};

export default LaunchDetails;
