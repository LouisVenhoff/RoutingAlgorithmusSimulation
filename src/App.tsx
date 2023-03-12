import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Terrain from './components/world/terrain';
import Toolbar from './components/toolBar/toolbar';
import { Mode } from './components/toolBar/toolbar';


function App() {
  
  
  const [mode, setMode] = useState<Mode>(Mode.POSITIONMODE);
  

  const modeChangeHandler = (mode:Mode) => 
  {
    setMode(mode);
  }
  
  
  
  return (
    <div className="App">
        <Terrain mode={mode}/>
        <div className="toolbarDiv">
            <Toolbar updateModeCallback={modeChangeHandler}/>
        </div>
    </div>
  );
}

export default App;
