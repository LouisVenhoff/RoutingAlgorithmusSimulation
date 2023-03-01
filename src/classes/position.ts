
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
    private maxX:number;
    private maxY:number;
    private connectCount:number;

    private xPosition:number = 0;
    private yPosition:number = 0;

    private neighbours:Position[] = [];


    constructor(maxX:number, maxY:number, connectCount:number)
    {
       this.maxX = maxX;
       this.maxY = maxY;
       this.connectCount = connectCount;
       this.generatePosition();
       
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
        
        this.processNeighbours(allPos);
        
        return this.neighbours;

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
    }

    private createPositionMarker(currentPos:Position):PositionMarker
    {
        let targetCords:PositionCords = currentPos.getPosition();
        
        let dist:number = this.calculateDistanceTo(targetCords.x, targetCords.y);

        let outObj = {pos:currentPos, distance:dist}

        return outObj;

    }

    private calculateDistanceTo(x:number, y:number):number
    {
        let xDiff:number = this.diffCords(this.xPosition, x);  
        let yDiff:number = this.diffCords(this.yPosition, y);
        
        let tempResult:number = Math.pow(xDiff, 2) + Math.pow(yDiff,2);

        return Math.sqrt(tempResult);
        
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


    private generatePosition()
    {
        this.xPosition = (Math.random() * (this.maxX));
        this.yPosition = (Math.random() * (this.maxY));
    }

}

export type {PositionCords};
export default Position;