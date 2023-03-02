import RoutingAlgo from "./routingAlgo";
import Position from "../classes/position";
import { PositionCords } from "../classes/position";

class DijkstraAlgo extends RoutingAlgo 
{
    constructor(posList:Position[], mark:(pos1:Position, pos2:Position) => void, select:(pos1:Position, pos2:Position) => void, remark:(pos1:Position, pos2:Position) => void)
    {
        super(posList, mark, select, remark);
    }

}