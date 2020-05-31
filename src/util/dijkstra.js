const closestNode = (distances, visited) => {
    // Default closest node = null
    let shortest = null;
    /*
    for (let node = 0; node < Object.keys(distances).length; node += 1) {
        const isShortest =
            shortest === null || distances[node] < distances[shortest];
        // If the node isShortest and has not been visited, set shortest equal to the node
        if (isShortest && !visited.includes(node)) {
            shortest = node;
        }
    }
    */
    Object.keys(distances).forEach((node) => {
        const isShortest =
            shortest === null || distances[node] < distances[shortest];
        // If the node isShortest and has not been visited, set shortest equal to the node
        if (isShortest && !visited.includes(node)) {
            shortest = node;
        }
    });
    return shortest;
};

const dijkstras = (graph, start, target) => {
    // Creates HashMap for distance from start node to the given node in the object
    let distances = {};
    // Distance from target node to start node is Inf
    distances[target] = Infinity;
    distances = Object.assign(distances, graph[start]);
    // Creates a HashMap for parents of each node so we can get the shortest path at the end
    const parents = { target: null };
    Object.keys(graph[start]).forEach((child) => {
        parents[child] = start;
    });
    // Array of visited nodes
    const visited = [];
    // CurrentNode is equal to the closest Node to the start node
    let currentNode = closestNode(distances, visited);
    while (currentNode) {
        const distance = distances[currentNode];
        const children = graph[currentNode];
        const childrenArr = Object.keys(children);
        // For all the children of the current node
        for (let child = 0; child < childrenArr.length; child += 1) {
            // If the child isn't the start node, the distance from the start to the child node is newDistance
            if (childrenArr[child] !== start) {
                const newDistance = distance + children[childrenArr[child]];
                // If there isn't a distance from the start to the child or if that distance is greater than newDistance
                if (
                    !distances[childrenArr[child]] ||
                    distances[childrenArr[child]] > newDistance
                ) {
                    // Set that distance to newDistance and let the parent of that node be curreneNode
                    distances[childrenArr[child]] = newDistance;
                    parents[childrenArr[child]] = currentNode;
                }
            }
        }
        // Append the currentNode to visited and change it to the closest unvisited node
        visited.push(currentNode);
        currentNode = closestNode(distances, visited);
    }
    // Go in reverse from target node to start and save that to the shortestPath
    const shortestPath = [target];
    let parent = parents[target];
    while (parent) {
        shortestPath.push(parent);
        parent = parents[parent];
    }
    shortestPath.reverse();
    return shortestPath;
};

export default dijkstras;
