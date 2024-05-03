import React, { useState, useEffect } from 'react';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => setLaunches(data))
      .catch(error => console.error('Error fetching launches:', error));
  }, []);

  const sortByLaunchDate = () => {
    const sortedLaunches = [...launches].sort((a, b) => a.date_utc.localeCompare(b.date_utc));
    setLaunches(sortedLaunches);
  };

  const sortByFlightNumber = () => {
    const sortedLaunches = [...launches].sort((a, b) => a.flight_number - b.flight_number);
    setLaunches(sortedLaunches);
  };

  const sortByName = () => {
    const sortedLaunches = [...launches].sort((a, b) => a.name.localeCompare(b.name));
    setLaunches(sortedLaunches);
  };

  const viewLaunchDetails = (launch) => {
    setSelectedLaunch(launch);
  };

  const renderLaunchDetails = () => {
    if (selectedLaunch) {
      const {
        name,
        details,
        links,
        success_rate_pct,
        upcoming,
        date_utc,
        rocket,
        launchpad,
      } = selectedLaunch;

      return (
        <div>
          <h2>{name}</h2>
          <p>Details: {details}</p>
          {links.youtube_id && (
            <div>
              <h3>YouTube Video</h3>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${links.youtube_id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <p>Success Rate: {success_rate_pct}%</p>
          <p>Upcoming: {upcoming ? 'Yes' : 'No'}</p>
          <p>Launch Date: {date_utc}</p>
          {links.mission_patch_small && (
            <img src={links.mission_patch_small} alt="Mission Patch" />
          )}
          <p>Launch Pad Coordinates:</p>
          <p>Latitude: {launchpad.latitude}</p>
          <p>Longitude: {launchpad.longitude}</p>
          <p>Launch Pad Site Name: {launchpad.full_name}</p>
          <p>Rocket Mass: {rocket.mass?.kg} kg</p>
          <p>Rocket Name: {rocket.rocket_name}</p>
          <p>Rocket Description: {rocket.description}</p>
          {rocket.flickr_images && (
            <div>
              <h3>Rocket Picture</h3>
              {rocket.flickr_images.map(imageUrl => (
                <img key={imageUrl} src={imageUrl} alt="Rocket" />
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      {selectedLaunch ? (
        renderLaunchDetails()
      ) : (
        <div>
          <h1>Launches:</h1>
          <button onClick={sortByLaunchDate}>Sort by Launch Date</button>
          <button onClick={sortByFlightNumber}>Sort by Flight Number</button>
          <button onClick={sortByName}>Sort by Name</button>
          {launches.map(launch => (
            <div key={launch.flight_number}>
              <p>Flight Number: {launch.flight_number}</p>
              <p>Name: {launch.name}</p>
              {launch.links && launch.links.patch && launch.links.patch.small && (
        <img src={launch.links.patch.small} alt="Launch Patch" />
      )}
              <p>Launch Date: {launch.date_utc}</p>
              <button onClick={() => viewLaunchDetails(launch)}>View Details</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LaunchList;