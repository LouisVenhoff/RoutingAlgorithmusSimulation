
type PositionCords = 
{
    x:number;
    y:number;
}

type PositionMarker = 
{
    pos:Position;
    distance:number;
}

class Position  
{
   
    

    private xPosition:number = 0;
    private yPosition:number = 0;
    private connectCount:number = 0;
    private neighbours:Position[] = [];
    private prePosition:Position | null = null;
    private metricCount:number = 0;
    private visited:boolean = false;


    private cost:number = 0;
   

    constructor(xPosition:number, yPosition:number)
    {
      this.xPosition = xPosition;
      this.yPosition = yPosition;
       
    }

    public getPosition():PositionCords
    {
        return{x:this.xPosition, y:this.yPosition}
    }

    public getNeighbours(allPos:Position[]):Position[]
    {
        if(this.neighbours.length > 0)
        {
            return this.neighbours;
        }

        let filteredPos:Position[] = []

        for(let i = 0; i < allPos.length; i++)   //Hier wird die eigene Position aus den Positionsarray rausgefiltert
        {
            if(allPos[i].getPosition().x !== this.getPosition().x && allPos[i].getPosition().y !== this.getPosition().y)
            {
                filteredPos.push(allPos[i]);
            }
            
        }

        this.processNeighbours(filteredPos);
        
        return this.neighbours;

    }

    public setNeighbours(pos:Position)
    {
        this.neighbours.push(pos);
    }   

   
    public getConnections():PositionMarker[] 
    {
        let conArr:PositionMarker[] = [];
        
        for(let i = 0; i < this.connectCount; i++)
        {
            conArr.push(this.createPositionMarker(this.neighbours[i]));
        }

        return conArr;
    }

    public getCost():number
    {
        return this.cost;
    }

    public setCost(value:number)
    {
        this.cost = value;
    }

    public getPrePosition():Position | null
    {
        return this.prePosition;
    }

    public setPrePosition(pos:Position)
    {
        this.prePosition = pos;
    }

    public getMetric():number
    {
       return this.metricCount; 
    }

    public setVisited()
    {
        this.visited = true; 
    }

    public getVisited():boolean
    {
        return this.visited;
    }

    public incrementMetric()
    {
        if(this.neighbours.length !== 0 && (this.neighbours.length - 1) !== this.metricCount)
        {
            this.metricCount++;
        }
        else
        {
            if(this.neighbours.length != 0)
            {
                window.alert("Die Metrik einer Position wurde zurückgesetzt!");
            }
        }
    }

    public calculateNeighbourDistances()
    {
        //TODO: 1. Berechne die Distanz zu jedem Nachbarn:
        //TODO: 3. Gebe jedem Nachbarn seine Distanz + deine eigenen Kosten als Cost parametern
        //TODO: 3.1 Die Cost des Nachbarn wird nur bearbeitet wenn diese geringer ist seine aktuelle

        if(this.neighbours.length === 0)
        {
            throw("First get all Neighbours from this node");
            return;
        }

        for(let i = 0; i < this.neighbours.length; i++)
        {
            let neigbourPosition:PositionCords = this.neighbours[i].getPosition();
            let tempDistance:number = this.calculateDistanceTo(neigbourPosition.x, neigbourPosition.y);
            
            let tempCost:number = this.cost + tempDistance;

            if(tempCost < this.neighbours[i].getCost())
            {
                this.neighbours[i].setCost(tempCost);
                this.neighbours[i].setPrePosition(this);
            }
        
        }

    }

    public calculateDistanceTo(x:number, y:number):number
    {
        let xDiff:number = this.diffCords(this.xPosition, x);  
        let yDiff:number = this.diffCords(this.yPosition, y);
        
        let tempResult:number = Math.pow(xDiff, 2) + Math.pow(yDiff,2);

        return Math.sqrt(tempResult);
        
    }

    private processNeighbours(allPos:Position[])
    {
        
        let calculatedPositions:PositionMarker[] = [];
        
        for(let i = 0; i < allPos.length; i++)
        {
            calculatedPositions.push(this.createPositionMarker(allPos[i]));
        }

        calculatedPositions.sort((a:PositionMarker, b:PositionMarker) => {return a.distance - b.distance});

        for(let j = 0; j < this.connectCount; j++)
        {
            this.neighbours.push(calculatedPositions[j].pos);
        }

        for(let k = 0; k < allPos.length; k++)
        {

        }
    }

    private createPositionMarker(currentPos:Position):PositionMarker
    {
        let targetCords:PositionCords = currentPos.getPosition();
        
        let dist:number = this.calculateDistanceTo(targetCords.x, targetCords.y);

        let outObj = {pos:currentPos, distance:dist}

        return outObj;

    }

    

    private diffCords(cordOne:number, cordTwo:number):number
    {
        let temp:number = cordOne - cordTwo;

        if(temp < 0)
        {
            return Math.abs(temp);
        }
        else
        {
            return temp;
        }
    }

}

export type {PositionCords};
export default Position;