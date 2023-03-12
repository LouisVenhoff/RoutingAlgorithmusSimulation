import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Position, { PositionCords } from "../../classes/position";
import "./terrainStyle.css";
import { Mode } from "../toolBar/toolbar";
import DijkstraAlgo from "../../algos/dijkstraAlgo";

type TerrainProps = 
{
    mode:Mode,
}

const Terrain:React.FC<TerrainProps> = ({mode}) => 
{
    
    const currentMode = useRef<Mode>();
    const positionA = useRef<Position | null>(null);
    const positionB = useRef<Position| null>(null);
   
    const [posList, setPosList] = useState<Position[]>([]);
   


    useEffect(() => {
        clearCanvas();
        initializeCursorListener(); 
        // drawCanvasPositions();
        // drawRelations();
    },[]);

    useEffect(() => {
        currentMode.current = mode;

        if(mode === Mode.STARTROUTINGMODE)
        {
            startRouting(posList);
        }

    },[mode]);

    useEffect(() => {

        


    },[posList]);

    const initializeCursorListener = () => 
    {
        const canvas:HTMLElement | null = document.getElementById("screen");
        
        if(canvas !== null)
        {
            canvas.addEventListener("mousedown", (e:any) => 
            {
                processCanvasClick(canvas as HTMLCanvasElement, e)
            });
        }
    }



    const processCanvasClick = (canvas:HTMLCanvasElement, event:any) => 
    {
        const rect:any = canvas.getBoundingClientRect();
        const mouseX:number = Math.floor(event.clientX - rect.left);
        const mouseY:number = Math.floor(event.clientY - rect.top);

        switch(currentMode.current)
        {
            case Mode.POSITIONMODE:
                posList.push(new Position(mouseX, mouseY));
                clearCanvas();
                drawCanvasPositions();
                break;
            case Mode.RELATIONMODE:
                let clickedPos:Position | null = findNearestPosition(mouseX, mouseY, 10);
                if(clickedPos !== null)
                {
                    manageLineDrawing(clickedPos);
                }
                break
            case Mode.SPECTATOR:
                let clicked:Position | null = findNearestPosition(mouseX, mouseY, 10);
                if(clicked != null)
                {
                    console.log(clicked.getPosition());
                    console.log(clicked.getPrePosition());
                }
                break;
        }

    }

    const manageLineDrawing = (pos:Position) => 
    {
        if(positionA.current == null)
        {
            positionA.current = pos;
        }
        else if(positionB.current == null)
        {
            positionB.current = pos;
            mergePositions(positionA.current, positionB.current);
            positionA.current = null;
            positionB.current = null;
        }
        else
        {
            positionA.current = pos;
            positionB.current = null;
        }
    }

    const mergePositions = (pos1:Position, pos2:Position) => 
    {
        pos1.setNeighbours(pos2);
        pos2.setNeighbours(pos1);
        drawRelations();
    }   

    const findNearestPosition = (posX:number, posY:number, threshold:number):Position | null => 
    {
        
        let outPos:Position | null = null;
        
        for(let i = 0; i < posList.length; i++)
        {
            let dist:number = posList[i].calculateDistanceTo(posX, posY);

            if(dist <= threshold)
            {
                outPos = posList[i];
            }
        }

        return outPos;
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


    const startRouting = (positions:Position[]) => 
    {
        if(positions.length !== 0 )
        {
            let routingAlgo:DijkstraAlgo = new DijkstraAlgo(positions, (pos1:Position, pos2:Position) => {markConnection(pos1, pos2)}, (pos1:Position, pos2:Position) => {selectConnection(pos1, pos2)}, (pos1:Position, pos2:Position) => {remarkConnection(pos1, pos2)});
            routingAlgo.startRouting();
        }
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
        //setPosList([]);
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