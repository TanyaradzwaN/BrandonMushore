import React from 'react';
import LaunchList from './components/LaunchList';
import LaunchListContainer from './components/LaunchListContainer';
import "./components/style.css";

const App = () => {
  return (
    <div className='launch-list'>
      <h1>Launch Dev Test</h1>
      <LaunchListContainer />
    </div>
  );
};

export default App;