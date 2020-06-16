import React, { useRef, useState, useEffect, useReducer } from "react";
import "./App.css";
import toGraph from "../util/toGraph";
import dijkstras from "../util/dijkstra";
import ControlPanel from "../ControlPanel/ControlPanel";
import gridGenerator from "../util/gridGenerator";
import GridContainer from "../GridContainer/GridContainer";
import Node from "../NodeInterface";

const SIZE = 31;

// Creates a node object literal
const createNode = (col: number, row: number): Node => {
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
const getInitialNodes = (): Array<Array<Node>> => {
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

function App(): JSX.Element {
    const [nodes, setNodes] = useState<Array<Array<Node>>>(getInitialNodes());
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [generateGridDisabled, setGenerateGridDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newNodes = getInitialNodes();
        setNodes(newNodes);
    }, []);

    // Removes all target nodes from the node array and chagnes it to the given cell
    const changeTarget = (colEnd: number, rowEnd: number): void => {
        const cell = `col${colEnd}row${rowEnd}`;
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
        setNodes(newNodes);
        // Same with the animations for the walls, only one node out of SIZE**2 nodes is being update so
        // to animate we have to force a full render
        forceUpdate();
    };

    // Removes all start nodes from the node array and changes it to the given cell
    const changeStart = (colStart: number, rowStart: number): void => {
        const cell = `col${colStart}row${rowStart}`;
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
        setNodes(newNodes);
        forceUpdate();
    };

    // Removes visited and path nodes inside the list of Nodes
    const removeVisited = (): Node[][] => {
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
    const graphWithAddedRemovedWall = (row: number, col: number): Node[][] => {
        const newNodes = nodes;
        newNodes[row - 1][col - 1].isWall = !newNodes[row - 1][col - 1].isWall;
        return newNodes;
    };

    // This is where we use the ref for imperative animations
    const animate = (visited: string[], path: string[]): void => {
        if (visited === undefined) {
            return;
        }
        for (let i = 0; i <= visited.length; i += 1) {
            if (i === visited.length) {
                for (let j = 0; j < path.length; j += 1) {
                    setTimeout(() => {
                        if (gridRef && gridRef.current) {
                            const childArr = [...gridRef.current.children];
                            childArr[
                                childArr.findIndex(
                                    (elem) => elem.id === path[j]
                                )
                            ].className = "Node true";
                        }
                    }, 15 * i + 30 * j);
                }
                break;
            } else {
                setTimeout(() => {
                    if (gridRef && gridRef.current) {
                        const childArr = [...gridRef.current.children];
                        childArr[
                            childArr.findIndex((elem) => elem.id === visited[i])
                        ].className = "Node visited";
                    }
                }, 15 * i);
            }
        }
    };

    // Animation is finished when there is a path on the grid
    const disableUntilAnimationFinishes = (time: number): void => {
        setTimeout(() => {
            setIsButtonDisabled(false);
        }, time);
    };

    const useVisualize = (
        rowStart: number,
        colStart: number,
        rowEnd: number,
        colEnd: number
    ): void => {
        // First, remove all visited nodes from the current grid
        setNodes(removeVisited());
        const graph = toGraph(nodes);
        const [path, visited] = dijkstras(
            graph,
            `col${colStart}row${rowStart}`,
            `col${colEnd}row${rowEnd}`
        );
        // Then, if the path is defined, disable the graph button and animte
        if (path !== undefined && visited !== undefined) {
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

    const handleOnMouseEnter = (row: number, col: number): void => {
        if (isMouseDown) {
            const newNodes = graphWithAddedRemovedWall(row, col);
            setNodes(newNodes);
            // Typically forceUpdate isn't good to call, but with these hooks, too little of the nodes array is changing
            // to justify a complete rerender, but that's needed to animate the walls on a mouseover
            forceUpdate();
        }
    };

    // TODO: combine these functions with the function up top
    const handleOnMouseDown = (row: number, col: number): void => {
        const newNodes = graphWithAddedRemovedWall(row, col);
        setNodes(newNodes);
        setIsMouseDown(true);
    };

    const handleOnMouseUp = (): void => {
        setIsMouseDown(false);
    };

    // Generates a grid using recursive division
    const generateGrid = (): void => {
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
    const resetGrid = (): void => {
        const newNodes = getInitialNodes();
        setNodes(newNodes);
        setGenerateGridDisabled(false);
        // After setting the className during the animate function, we have to reset it
        // through a manual DOM update over here
        if (gridRef && gridRef.current) {
            for (let i = 0; i < gridRef.current.children.length; i += 1) {
                gridRef.current.children[i].className = "Node false";
            }
        }
    };

    return (
        <div className="container-fullwidth">
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
