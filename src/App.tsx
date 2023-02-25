import React from 'react';
import logo from './logo.svg';
import './App.css';
import Terrain from './components/world/terrain';

function App() {
  return (
    <div className="App">
        <Terrain posCount={10}/>
    </div>
  );
}

export default App;
