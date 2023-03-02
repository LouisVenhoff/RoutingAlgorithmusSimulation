import Position from "../classes/position";
import { PositionCords } from "../classes/position";


abstract class RoutingAlgo
{

    private posList:Position[];
    private mark:(pos1:Position, pos2:Position) => void;
    private select:(pos1:Position, pos2:Position) => void;
    private remark:(pos1:Position, pos2:Position) => void;

    private startPosition:Position;
    private endPosition:Position;

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