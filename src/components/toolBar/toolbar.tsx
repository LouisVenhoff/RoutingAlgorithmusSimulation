import React, { useState } from "react";
import "./toolbarStyle.css";

type toolBarProps = 
{
    settingsCallback:(positionCount:number, conCount:number) => void;
}




const Toolbar:React.FC<toolBarProps> = ({settingsCallback}) => 
{
    const [positionCount, setPositionCount] = useState<string>("0");
    const [conCount, setConCount] = useState<string>("0");

    const updateSettingsHandler = () => 
    {
        
        let positions:number = parseInt(positionCount);
        let connections:number = parseInt(conCount);
        
        
        if(positions < connections)
        {
            window.alert("Es müssen mehr Knoten als verbindungen bestehen!");
            return;
        }
        settingsCallback(positions, connections);
    }

    return(
    <div>
        Anzahl Knoten:<input type="number" className="toolbarElement" max={100} onChange={(e:any) => {setPositionCount(e.target.value)}}></input>
        Verbindungen/Knoten:<input type="number" className="toolbarElement" max={100} onChange={(e:any) => {setConCount(e.target.value)}}></input>
        <button className="toolbarElement" onClick={updateSettingsHandler}>Aktualisieren</button>
    </div>
    );
}

export default Toolbar;