import React, { useState } from "react";
import "./toolbarStyle.css";

type toolBarProps = 
{
    updateModeCallback:(mode:Mode) => void;
}

enum Mode
{
    POSITIONMODE,
    RELATIONMODE,
    STARTROUTINGMODE,
    SPECTATOR,
}




const Toolbar:React.FC<toolBarProps> = ({updateModeCallback}) => 
{

    const updateMode = (mode:Mode) => 
    {
        updateModeCallback(mode);
    }

    


    return(
    <div>
        <button className="toolbarElement" onClick={() => {updateMode(Mode.POSITIONMODE)}}>Position hinzufügen</button>  
        <button className="toolbarElement" onClick={() => {updateMode(Mode.RELATIONMODE)}}>Verbindungen Zeichnen</button>
        <button className="toolbarElement" onClick={() => {updateMode(Mode.STARTROUTINGMODE)}}>Starte Routing</button>
        <button className="toolbarElement" onClick={() => {updateMode(Mode.SPECTATOR)}}>Zeige Kosten</button>
    </div>
    );
}

export {Mode};
export default Toolbar;