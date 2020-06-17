const manhattanHeuristic = (start: string, target: string): number => {
    const colStart = Number(start.match(/(?<=col)\d*/));
    const rowStart = Number(start.match(/(?<=row)\d*/));
    const colTarget = Number(target.match(/(?<=col)\d*/));
    const rowTarget = Number(target.match(/(?<=row)\d*/));
    return Math.abs(colTarget - colStart) + Math.abs(rowTarget - rowStart);
};

const reconstructPath = (
    cameFrom: { [index: string]: string },
    current: string
): string[] => {
    const path = [current];
    let curr = current;
    while (Object.keys(cameFrom).includes(curr)) {
        curr = cameFrom[curr];
        path.unshift(curr);
    }
    return path;
};

const aStar = (
    graph: { [index: string]: { [index: string]: number } },
    start: string,
    target: string
): [string[], string[]] | [undefined, undefined] => {
    if (graph[start] === undefined || graph[target] === undefined) {
        return [undefined, undefined];
    }
    const openSet = [start];
    const visited = [];
    const cameFrom: { [index: string]: string } = {};
    const gScore: { [index: string]: number } = { [start]: 0 };
    const fScore: { [index: string]: number } = {
        [start]: manhattanHeuristic(start, target),
    };
    while (openSet.length > 0) {
        let current = openSet[0];
        for (let i = 0; i < openSet.length; i += 1) {
            if (fScore[openSet[i]] < fScore[current]) {
                current = openSet[i];
            }
        }
        if (current === target) {
            return [reconstructPath(cameFrom, current), visited];
        }
        const currentIdx = openSet.indexOf(current);
        openSet.splice(currentIdx, 1);
        const neighbors: string[] = Object.keys(graph[current]);
        for (let i = 0; i < neighbors.length; i += 1) {
            const tentativeGScore = gScore[current] + 1;
            if (
                tentativeGScore < gScore[neighbors[i]] ||
                gScore[neighbors[i]] === undefined
            ) {
                cameFrom[neighbors[i]] = current;
                gScore[neighbors[i]] = tentativeGScore;
                fScore[neighbors[i]] =
                    gScore[neighbors[i]] +
                    manhattanHeuristic(neighbors[i], target);
                if (!openSet.includes(neighbors[i])) {
                    openSet.push(neighbors[i]);
                }
            }
            visited.push(neighbors[i]);
        }
    }
    return [undefined, undefined];
};

export default aStar;
