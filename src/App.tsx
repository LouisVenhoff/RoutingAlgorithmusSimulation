import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Terrain from './components/world/terrain';
import Toolbar from './components/toolBar/toolbar';

function App() {
  
  
  const [positionCount, setPositionCount] = useState<number>(0);
  const [conCount, setConCount] = useState<number>(0);
  

  const settingsChangeHandler = (positionCount:number, conCount:number) => 
  {
      setPositionCount(positionCount);
      setConCount(conCount);
  }
  
  
  
  return (
    <div className="App">
        <Terrain posCount={positionCount} conCount={conCount}/>
        <div className="toolbarDiv">
            <Toolbar settingsCallback={settingsChangeHandler}/>
        </div>
    </div>
  );
}

export default App;
