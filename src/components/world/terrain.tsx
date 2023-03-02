import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Position, { PositionCords } from "../../classes/position";
import "./terrainStyle.css";

type TerrainProps = 
{
    posCount:number;
    conCount:number;
}



const Terrain:React.FC<TerrainProps> = ({posCount, conCount}) => 
{
    
    const [posList, setPosList] = useState<Position[]>([]);
    

    useEffect(() => {
        clearCanvas();
        generatePositions(posCount);
        drawCanvasPositions();
        drawRelations();
    },[]);

    useEffect(() => {
        clearCanvas();
        generatePositions(posCount);
        drawCanvasPositions();
        drawRelations();
        
    },[posCount, conCount]);

    

    const generatePositions = (count:number) => 
    {
        setPosList([]);  
        for(let i = 0; i < count; i++)
        {
            posList.push(new Position(1000, 600, conCount));
        }
    }

    const drawRelations = () => 
    {
       
        for(let i = 0; i < posList.length; i++)
        {
            let startPoint:PositionCords = posList[i].getPosition();

            let neighbours:Position[] = posList[i].getNeighbours(posList);
            
            for(let j = 0; j < neighbours.length; j++)
            {
                drawLine(startPoint, neighbours[j].getPosition(), "red",1);
              
            }
        }
    }

    const markConnection = (pos1:Position, pos2:Position) => 
    {
        resetConnection(pos1, pos2)
        drawLine(pos1.getPosition(), pos2.getPosition(), "yellow",1);
        console.log("Drawing green Line");
    }

    const remarkConnection = (pos1:Position, pos2:Position) => 
    {
        resetConnection(pos1, pos2);
        drawLine(pos1.getPosition(), pos2.getPosition(), "red", 1);
    }

    const selectConnection = (pos1:Position, pos2:Position) => 
    {
        resetConnection(pos1, pos2);
        drawLine(pos1.getPosition(), pos2.getPosition(), "lightgreen",3);
    }

    const resetConnection = (pos1:Position, pos2:Position) => 
    {
        drawLine(pos1.getPosition(), pos2.getPosition(), "#333333", 5);
    }


    const getCanvas = ():HTMLElement | null => 
    {
        return document.getElementById("screen");
    }

    const clearCanvas = () => 
    {
        setPosList([]);
        let canvas:HTMLCanvasElement = getCanvas() as HTMLCanvasElement;
        let context:any = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drawItem = (posObj:PositionCords) =>
    {
        let canvas:any = getCanvas();
        let drawingContext:CanvasRenderingContext2D = canvas.getContext("2d");
        drawingContext.fillStyle = "white";
        drawingContext.fillRect(posObj.x, posObj.y, 10, 10); 
        
    }

    const drawLine = (start:PositionCords, target:PositionCords, colorCode:string, lineWidth:number) => 
    {
        let canvas:any = getCanvas();
        let drawingContext:CanvasRenderingContext2D = canvas.getContext("2d");
        drawingContext.beginPath();
        drawingContext.lineWidth = lineWidth;
        drawingContext.strokeStyle = colorCode;
        drawingContext.moveTo(start.x, start.y);
        drawingContext.lineTo(target.x, target.y );
        drawingContext.stroke();
        drawingContext.closePath();
    }

    const drawCanvasPositions = () => 
    {
        for(let i = 0; i < posList.length; i++)
        {
            drawItem(posList[i].getPosition())
        }
    }

    return(
    <div className="terrainDiv">
         <div className="world">
            <canvas id="screen"  width="1000" height="600"/>
        </div>
    </div>
   
    );
}

export default Terrain;