import RoutingAlgo from "./routingAlgo";
import Position from "../classes/position";
import { PositionCords } from "../classes/position";

class DijkstraAlgo extends RoutingAlgo {

    private startPos: Position;
    private targetPos:Position;
    private currentPos: Position;
    private notVisited: Position[] = [];
    private visited: Position[] = [];
    private resultPath:Position[] = [];


    constructor(posList: Position[], mark: (pos1: Position, pos2: Position) => void, select: (pos1: Position, pos2: Position) => void, remark: (pos1: Position, pos2: Position) => void) {
        super(posList, mark, select, remark);
        this.currentPos = this.posList[0];
        this.notVisited = posList;
        this.startPos = this.posList[0];
        this.targetPos = this.posList[this.posList.length - 1];
    }

    public startRouting() {
        
        let algoTerminated:boolean = false;
        this.setInitialState();
        console.log("Algo started");

        while(!algoTerminated)
        {
            let tempMinPos:Position| undefined = undefined;
            let tempMinCost:number = Infinity;

            for(let i = 0; i < this.posList.length; i++)
            {
                if(this.posList[i].getCost() < tempMinCost && !this.posList[i].getVisited())
                {
                    tempMinCost = this.posList[i].getCost();
                    tempMinPos = this.posList[i];
                }
            }

            if(tempMinPos != undefined)
            {
                this.currentPos = tempMinPos;
            }

            this.currentPos.calculateNeighbourDistances();

            let allVisited:boolean = true;

            for(let i = 0; i < this.posList.length; i++)
            {
                if(!this.posList[i].getVisited())
                {
                    allVisited = false;
                }
            }
            this.currentPos.setVisited();
            algoTerminated = allVisited;

        }

        console.log(this.targetPos);

        this.resolvePath(this.targetPos);

        this.drawPath();

    }

    private setInitialState() {
        
        if(this.posList.length === 0)
        {
            throw("Keine Positionen");
        }
        
        this.startPos.setCost(0);

        for(let i = 1; i < this.posList.length; i++)
        {
            this.posList[i].setCost(Infinity);
        }

        

        //TODO: Trage Startknoten in die bereits besucht Liste ein
    }


    private findCheapest(): Position {

        let cheapest: Position = this.notVisited[0];

        for (let i = 0; i < this.notVisited.length; i++) {
            if (cheapest.getCost() > this.notVisited[i].getCost()) {
                cheapest = this.notVisited[i]
            }
        }

        return cheapest;
    }



    private setVisited(pos: Position) {
        console.log(pos.getPosition());
        pos.setVisited();
        this.visited.push(pos);
        let temp: Position[] = []


        this.notVisited.map((element: Position) => {
            if (!this.comparePositions(element, pos)) {
                temp.push(element);
            }
            else {
                console.log("Found!");
            }
        });

        this.notVisited = temp;
    
    
    }

    private checkVisited(pos: Position): boolean {
        return pos.getVisited();
    }

    private comparePositions(pos1: Position, pos2: Position): boolean {
        if (pos1.getPosition().x === pos2.getPosition().x && pos1.getPosition().y === pos2.getPosition().y) {
            return true;
        }
        else {
            return false;
        }
    }


    // private resolveResultPath()
    // {
    //     let current:Position | null = this.targetPos;
    //     let temp:Position [] = [];

    //     if(current === null)
    //     {
    //         return;
    //     }

    //     temp.push(current);

    //     while(true)
    //     {
    //         if(current == null)
    //         {
    //             break;
    //         }
            
    //         let previousPosition:Position | null = current.getPrePosition();

    //         if(previousPosition !== null)
    //         {
    //             current = previousPosition;
    //             temp.push(current);
    //         }
    //         else
    //         {
    //             break;
    //         }
    //     }

    //     this.resultPath = temp.reverse();
    // }

    private resolvePath(pos:Position | null)
    {
        if(pos === null)
        {
            return;
        }
    
        this.resultPath.push(pos);

        this.resolvePath(pos.getPrePosition());
    }

    private drawPath()
    {
        if(this.resultPath.length !== 0)
        {
            for(let i = 0; i < this.resultPath.length; i++)
            {
                if(i === 0)
                {
                    this.select(this.resultPath[0], this.resultPath[1]);
                    continue;
                }
                else if(i === this.resultPath.length - 2)
                {
                    this.select(this.resultPath[this.resultPath.length - 2], this.resultPath[this.resultPath.length - 1]);
                    break;
                }

                this.select(this.resultPath[i], this.resultPath[i + 1]);
            }
        }
    }
    


}




export default DijkstraAlgo;