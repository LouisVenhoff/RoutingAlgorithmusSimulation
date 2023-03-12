import Position from "../classes/position";
import { PositionCords } from "../classes/position";


abstract class RoutingAlgo
{

    protected posList:Position[];
    protected mark:(pos1:Position, pos2:Position) => void;
    protected select:(pos1:Position, pos2:Position) => void;
    protected remark:(pos1:Position, pos2:Position) => void;

    protected startPosition:Position;
    protected endPosition:Position;

    constructor(posList:Position[], mark:(pos1:Position, pos2:Position) => void, select:(pos1:Position, pos2:Position) => void, remark:(pos1:Position, pos2:Position) => void)
    {
        this.posList = posList;
        this.mark = mark;
        this.select = select;
        this.remark = remark;
        this.startPosition = this.posList[0];
        this.endPosition = this.posList[1];
    }


}

export default RoutingAlgo;