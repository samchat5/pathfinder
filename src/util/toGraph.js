// [List-of Node] => Graph
const toGraph = (nodeArray) => {
    const graph = {};
    for (let i = 0; i < nodeArray.length; i += 1) {
        for (let j = 0; j < nodeArray[i].length; j += 1) {
            const nodeName = nodeArray[i][j].name;
            const neighbors = {};
            const top = i !== 0 ? nodeArray[i - 1][j].name : null;
            const bottom =
                i !== nodeArray.length - 1
                    ? nodeArray[i + 1][j].props.name
                    : null;
            const left = j !== 0 ? nodeArray[i][j - 1].name : null;
            const right =
                j !== nodeArray[i].length - 1 ? nodeArray[i][j + 1].name : null;
            if (left) {
                neighbors[left] = 1;
            }
            if (right) {
                neighbors[right] = 1;
            }
            if (top) {
                neighbors[top] = 1;
            }
            if (bottom) {
                neighbors[bottom] = 1;
            }
            graph[nodeName] = neighbors;
        }
    }
    return graph;
};

export default toGraph;
