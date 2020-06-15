import React, { useRef, useState, useEffect, useReducer } from "react";
import "./App.css";
import toGraph from "../util/toGraph";
import dijkstras from "../util/dijkstra";
import ControlPanel from "../ControlPanel/ControlPanel";
import gridGenerator from "../util/gridGenerator";
import GridContainer from "../GridContainer/GridContainer";

const SIZE = 31;

// Creates a node object literal
const createNode = (col, row) => {
    return {
        isPath: false,
        name: `col${col + 1}row${row + 1}`,
        col: col + 1,
        row: row + 1,
        isWall: false,
        isStart: false,
        isTarget: false,
        isVisited: false,
    };
};

// Builds a node array representing the initial state of the grid
const getInitialNodes = () => {
    const nodes = [];
    for (let i = 0; i < SIZE; i += 1) {
        const row = [];
        for (let j = 0; j < SIZE; j += 1) {
            if (i === 1 && j === 1) {
                const start = createNode(j, i);
                start.isStart = true;
                row.push(start);
            } else if (i === SIZE - 2 && j === SIZE - 2) {
                const target = createNode(j, i);
                target.isTarget = true;
                row.push(target);
            } else {
                row.push(createNode(j, i));
            }
        }
        nodes.push(row);
    }
    return nodes;
};

function App() {
    const [nodes, setNodes] = useState([]);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [generateGridDisabled, setGenerateGridDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const gridRef = useRef();

    useEffect(() => {
        const newNodes = getInitialNodes();
        setNodes(newNodes);
    }, []);

    // Removes all target nodes from the node array and chagnes it to the given cell
    const addTarget = (cell) => {
        const newNodes = nodes;
        for (let i = 0; i < nodes.length; i += 1) {
            for (let j = 0; j < nodes[i].length; j += 1) {
                if (nodes[i][j].name === cell) {
                    const target = createNode(j, i);
                    target.isTarget = true;
                    newNodes[i][j] = target;
                } else if (nodes[i][j].isTarget === true) {
                    newNodes[i][j].isTarget = false;
                }
            }
        }
        return newNodes;
    };

    // Removes all start nodes from the node array and changes it to the given cell
    const addStart = (cell) => {
        const newNodes = nodes;
        for (let i = 0; i < nodes.length; i += 1) {
            for (let j = 0; j < nodes[i].length; j += 1) {
                if (nodes[i][j].name === cell) {
                    const start = createNode(j, i);
                    start.isStart = true;
                    newNodes[i][j] = start;
                } else if (nodes[i][j].isStart === true) {
                    newNodes[i][j].isStart = false;
                }
            }
        }
        return newNodes;
    };

    // Removes visited and path nodes inside the list of Nodes
    const removeVisited = () => {
        const newNodes = nodes;
        for (let i = 0; i < SIZE; i += 1) {
            for (let j = 0; j < SIZE; j += 1) {
                newNodes[i][j].isPath = false;
                newNodes[i][j].isVisited = false;
            }
        }
        return newNodes;
    };

    // Toggles whether or not a node is a wal or not
    const graphWithAddedRemovedWall = (row, col) => {
        const newNodes = nodes;
        newNodes[row - 1][col - 1].isWall = !newNodes[row - 1][col - 1].isWall;
        return newNodes;
    };

    // This is where we use the ref for imperative animations
    const animate = (visited, path) => {
        if (visited === undefined) {
            return;
        }
        for (let i = 0; i <= visited.length; i += 1) {
            if (i === visited.length) {
                for (let j = 0; j < path.length; j += 1) {
                    setTimeout(() => {
                        gridRef.current.children[path[j]].className =
                            "Node true";
                    }, 15 * i + 30 * j);
                }
                break;
            } else {
                setTimeout(() => {
                    gridRef.current.children[visited[i]].className =
                        "Node visited";
                }, 15 * i);
            }
        }
    };

    // Animation is finished when there is a path on the grid
    const disableUntilAnimationFinishes = (time) => {
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, time);
    };

    // TODO: combine these functions with those defined above
    const changeStart = (colStart, rowStart) => {
        const newNodes = addStart(nodes, `col${colStart}row${rowStart}`);
        setNodes(newNodes);
    };

    const changeTarget = (colEnd, rowEnd) => {
        const newNodes = addTarget(nodes, `col${colEnd}row${rowEnd}`);
        setNodes(newNodes);
    };

    const useVisualize = (rowStart, colStart, rowEnd, colEnd) => {
        // First, remove all visited nodes from the current grid
        setNodes(removeVisited(nodes));
        const graph = toGraph(nodes);
        const [path, visited] = dijkstras(
            graph,
            `col${colStart}row${rowStart}`,
            `col${colEnd}row${rowEnd}`
        );
        // Then, if the path is defined, disable the graph button and animte
        if (path !== undefined) {
            setIsButtonDisabled(true);
            animate(visited, path);
            const time = 15 * visited.length + 30 * path.length;
            // Enable the button after time ms
            disableUntilAnimationFinishes(time);
            // TODO: make this it's own function?
            setTimeout(() => {
                setNodes(() => {
                    const newNodes = nodes;
                    for (let i = 0; i < nodes.length; i += 1) {
                        for (let j = 0; j < nodes[i].length; j += 1) {
                            if (path.includes(nodes[i][j].name)) {
                                newNodes[i][j].isPath = true;
                            } else if (visited.includes(nodes[i][j].name)) {
                                newNodes[i][j].isVisited = true;
                            }
                        }
                    }
                    return newNodes;
                });
            }, time);
        }
    };

    const handleOnMouseEnter = (row, col) => {
        if (isMouseDown) {
            const newNodes = graphWithAddedRemovedWall(row, col);
            setNodes(newNodes);
            // Typically forceUpdate isn't good to call, but with these hooks, too little of the nodes array is changing
            // to justify a complete rerender, but that's needed to animate the walls on a mouseover
            forceUpdate();
        }
    };

    // TODO: combine these functions with the function up top
    const handleOnMouseDown = (row, col) => {
        const newNodes = graphWithAddedRemovedWall(row, col);
        setNodes(newNodes);
        setIsMouseDown(true);
    };

    const handleOnMouseUp = () => {
        setIsMouseDown(false);
    };

    // Generates a grid using recursive division
    const generateGrid = () => {
        const newNodes = gridGenerator(nodes);
        for (let i = 0; i < SIZE; i += 1) {
            for (let j = 0; j < SIZE; j += 1) {
                if (newNodes[i][j].isPath) {
                    newNodes[i][j].isPath = false;
                }
                if (newNodes[i][j].isVisited) {
                    newNodes[i][j].isVisited = false;
                }
            }
        }
        setNodes(newNodes);
        setGenerateGridDisabled(true);
    };

    // Resets the grid to initial state
    const resetGrid = () => {
        const newNodes = getInitialNodes();
        setNodes(newNodes);
        setGenerateGridDisabled(false);
        // After setting the className during the animate function, we have to reset it
        // through a manual DOM update over here
        for (let i = 0; i < gridRef.current.children.length; i += 1) {
            gridRef.current.children[i].className = "Node false";
        }
    };

    return (
        <div className="App container">
            <ControlPanel
                isButtonDisabled={isButtonDisabled}
                visualize={useVisualize}
                changeStart={changeStart}
                changeTarget={changeTarget}
                generateGrid={generateGrid}
                generateGridDisabled={generateGridDisabled}
                resetGrid={resetGrid}
            />
            <GridContainer
                onMouseEnter={handleOnMouseEnter}
                onMouseUp={handleOnMouseUp}
                onMouseDown={handleOnMouseDown}
                ref={gridRef}
                nodes={nodes}
            />
        </div>
    );
}

export default App;
