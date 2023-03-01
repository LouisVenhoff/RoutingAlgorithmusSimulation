import React, { useState } from "react";
import "./toolbarStyle.css";

type toolBarProps = 
{
    settingsCallback:(positionCount:number, conCount:number) => void;
}




const Toolbar:React.FC<toolBarProps> = ({settingsCallback}) => 
{
    const [positionCount, setPositionCount] = useState<number>(0);
    const [conCount, setConCount] = useState<number>(0);

    const updateSettingsHandler = () => 
    {
        settingsCallback(positionCount, conCount);
    }

    return(
    <div>
        Anzahl Knoten:<input type="number" className="toolbarElement" max={100} onChange={(e:any) => {setPositionCount(e.target.value)}}></input>
        Verbindungen/Knoten:<input type="number" className="toolbarElement" max={10} onChange={(e:any) => {setConCount(e.target.value)}}></input>
        <button className="toolbarElement" onClick={updateSettingsHandler}>Aktualisieren</button>
    </div>
    );
}

export default Toolbar;