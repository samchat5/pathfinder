export default interface Node {
    isPath: boolean;
    name: string;
    col: number;
    row: number;
    isWall: boolean;
    isStart: boolean;
    isTarget: boolean;
    isVisited: boolean;
}
