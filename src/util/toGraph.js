// [List-of Node] => Graph
const toGraph = (nodeArray) => {
    const graph = {};
    for (let i = 0; i < nodeArray.length; i += 1) {
        for (let j = 0; j < nodeArray[i].length; j += 1) {
            if (!nodeArray[i][j].isWall) {
                const nodeName = nodeArray[i][j].name;
                const neighbors = {};
                const top = i !== 0 ? nodeArray[i - 1][j] : null;
                const bottom =
                    i !== nodeArray.length - 1 ? nodeArray[i + 1][j] : null;
                const left = j !== 0 ? nodeArray[i][j - 1] : null;
                const right =
                    j !== nodeArray[i].length - 1 ? nodeArray[i][j + 1] : null;
                if (left && !left.isWall) {
                    neighbors[left.name] = 1;
                }
                if (right && !right.isWall) {
                    neighbors[right.name] = 1;
                }
                if (top && !top.isWall) {
                    neighbors[top.name] = 1;
                }
                if (bottom && !bottom.isWall) {
                    neighbors[bottom.name] = 1;
                }
                graph[nodeName] = neighbors;
            }
        }
    }
    return graph;
};

export default toGraph;
