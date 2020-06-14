import React from "react";
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

// Toggles whether or not a node is a wal or not
const graphWithAddedRemovedWall = (nodes, row, col) => {
    const newNodes = nodes;
    newNodes[row - 1][col - 1].isWall = !newNodes[row - 1][col - 1].isWall;
    return newNodes;
};

// Returns the time it takes to finish the animation in ms
const getAnimationTime = (visited, path) => {
    return 15 * visited.length + 30 * path.length;
};

// Removes all target nodes from the node array and chagnes it to the given cell
const addTarget = (nodes, cell) => {
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
const addStart = (nodes, cell) => {
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
const removeVisited = (nodes) => {
    const newNodes = nodes;
    for (let i = 0; i < SIZE; i += 1) {
        for (let j = 0; j < SIZE; j += 1) {
            newNodes[i][j].isPath = false;
            newNodes[i][j].isVisited = false;
        }
    }
    return newNodes;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isMouseDown: false,
            isButtonDisabled: false,
            generateGridDisabled: false,
        };

        // Normally refs aren't good but the React documents state that they are admissiable when doing imperative animations such as these
        this.gridRef = React.createRef();

        // Mouse handler methods
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);

        // Animation methods
        this.visualize = this.visualize.bind(this);
        this.animate = this.animate.bind(this);

        // Graph manipulation methods
        this.changeStart = this.changeStart.bind(this);
        this.changeTarget = this.changeTarget.bind(this);

        // Grid methods
        this.generateGrid = this.generateGrid.bind(this);
        this.resetGrid = this.resetGrid.bind(this);
    }

    componentDidMount() {
        const nodes = getInitialNodes();
        this.setState({ nodes });
    }

    // This is where we use the ref for imperative animations
    animate(visited, path) {
        if (visited === undefined) {
            return;
        }
        for (let i = 0; i <= visited.length; i += 1) {
            if (i === visited.length) {
                for (let j = 0; j < path.length; j += 1) {
                    setTimeout(() => {
                        this.gridRef.current.children[path[j]].className =
                            "Node true";
                    }, 15 * i + 30 * j);
                }
                break;
            } else {
                setTimeout(() => {
                    this.gridRef.current.children[visited[i]].className =
                        "Node visited";
                }, 15 * i);
            }
        }
    }

    // Animation is finished when there is a path on the grid
    disableUntilAnimationFinishes(time) {
        setTimeout(() => {
            this.setState({ isButtonDisabled: false });
        }, time);
    }

    // TODO: combine these functions with those defined above
    changeStart(colStart, rowStart) {
        const { nodes } = this.state;
        const newNodes = addStart(nodes, `col${colStart}row${rowStart}`);
        this.setState({ nodes: newNodes });
    }

    changeTarget(colEnd, rowEnd) {
        const { nodes } = this.state;
        const newNodes = addTarget(nodes, `col${colEnd}row${rowEnd}`);
        this.setState({ nodes: newNodes });
    }

    visualize(rowStart, colStart, rowEnd, colEnd) {
        // First, remove all visited nodes from the current grid
        this.setState(
            (prevState) => {
                return { nodes: removeVisited(prevState.nodes) };
            },
            () => {
                const { nodes } = this.state;
                const graph = toGraph(nodes);
                const [path, visited] = dijkstras(
                    graph,
                    `col${colStart}row${rowStart}`,
                    `col${colEnd}row${rowEnd}`
                );
                // Then, if the path is defined, disable the graph button and animte
                if (path !== undefined) {
                    this.setState({ isButtonDisabled: true });
                    this.animate(visited, path);
                    const time = getAnimationTime(visited, path);
                    // Enable the button after time ms
                    this.disableUntilAnimationFinishes(time);
                    // TODO: make this it's own function?
                    setTimeout(() => {
                        this.setState((prevState) => {
                            const newNodes = prevState.nodes;
                            for (
                                let i = 0;
                                i < prevState.nodes.length;
                                i += 1
                            ) {
                                for (
                                    let j = 0;
                                    j < prevState.nodes[i].length;
                                    j += 1
                                ) {
                                    if (
                                        path.includes(
                                            prevState.nodes[i][j].name
                                        )
                                    ) {
                                        newNodes[i][j].isPath = true;
                                    } else if (
                                        visited.includes(
                                            prevState.nodes[i][j].name
                                        )
                                    ) {
                                        newNodes[i][j].isVisited = true;
                                    }
                                }
                            }
                            return { nodes: newNodes };
                        });
                    }, time);
                }
            }
        );
    }

    // TODO: combine these functions with the function up top
    handleOnMouseDown(row, col) {
        const { nodes } = this.state;
        const newNodes = graphWithAddedRemovedWall(nodes, row, col);
        this.setState({ nodes: newNodes, isMouseDown: true });
    }

    handleOnMouseUp() {
        this.setState({ isMouseDown: false });
    }

    handleOnMouseEnter(row, col) {
        const { isMouseDown, nodes } = this.state;
        if (isMouseDown) {
            const newNodes = graphWithAddedRemovedWall(nodes, row, col);
            this.setState({ nodes: newNodes });
        }
    }

    // Generates a grid using recursive division
    generateGrid() {
        const { nodes } = this.state;
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
        this.setState({ nodes: newNodes, generateGridDisabled: true });
    }

    // Resets the grid to initial state
    resetGrid() {
        const newNodes = getInitialNodes();
        this.setState({ nodes: newNodes, generateGridDisabled: false });
    }

    render() {
        const { nodes, isButtonDisabled, generateGridDisabled } = this.state;
        return (
            <div className="App container">
                <ControlPanel
                    isButtonDisabled={isButtonDisabled}
                    visualize={this.visualize}
                    changeStart={this.changeStart}
                    changeTarget={this.changeTarget}
                    generateGrid={this.generateGrid}
                    generateGridDisabled={generateGridDisabled}
                    resetGrid={this.resetGrid}
                />
                <GridContainer
                    onMouseEnter={this.handleOnMouseEnter}
                    onMouseUp={this.handleOnMouseUp}
                    onMouseDown={this.handleOnMouseDown}
                    ref={this.gridRef}
                    nodes={nodes}
                />
            </div>
        );
    }
}

export default App;
