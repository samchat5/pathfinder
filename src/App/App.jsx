import React from "react";
import Node from "../Node/Node";
import "./App.css";
import toGraph from "../util/toGraph";
import dijkstras from "../util/dijkstra";
import ControlPanel from "../ControlPanel/ControlPanel";

const createNode = (col, row) => {
    return {
        isPath: false,
        name: `col${col + 1}row${row + 1}`,
        col: col + 1,
        row: row + 1,
        isWall: false,
    };
};

const getInitialNodes = () => {
    const nodes = [];
    for (let i = 0; i < 20; i += 1) {
        const row = [];
        for (let j = 0; j < 20; j += 1) {
            row.push(createNode(j, i));
        }
        nodes.push(row);
    }
    return nodes;
};

const graphWithAddedRemovedWall = (nodes, row, col) => {
    const newNodes = nodes;
    newNodes[row - 1][col - 1].isWall = !newNodes[row - 1][col - 1].isWall;
    return newNodes;
};

const removeVisited = (nodes) => {
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (nodes[i][j].isWall) {
                document.getElementById(nodes[i][j].name).className =
                    "Node wall false";
            } else {
                document.getElementById(nodes[i][j].name).className =
                    "Node false";
            }
        }
    }
};

const animate = (visited, path) => {
    if (visited === undefined) {
        return;
    }
    for (let i = 0; i <= visited.length; i += 1) {
        if (i === visited.length) {
            for (let j = 0; j < path.length; j += 1) {
                setTimeout(() => {
                    document.getElementById(path[j]).className = `Node true`;
                }, 15 * i);
            }
            break;
        } else {
            setTimeout(() => {
                document.getElementById(visited[i]).className = `Node visited`;
            }, 15 * i);
        }
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isMouseDown: false,
            isButtonDisabled: false,
        };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.visualize = this.visualize.bind(this);
    }

    componentDidMount() {
        const nodes = getInitialNodes();
        this.setState({ nodes });
    }

    // Animation is finished when there is a path on the grid
    disableUntilAnimationFinishes() {
        const int = setInterval(() => {
            if (document.getElementsByClassName("Node true").length !== 0) {
                this.setState({ isButtonDisabled: false });
                clearInterval(int);
            }
        }, 10);
    }

    visualize(rowStart, colStart, rowEnd, colEnd) {
        const { nodes } = this.state;
        removeVisited(nodes);
        const graph = toGraph(nodes);
        const [path, visited] = dijkstras(
            graph,
            `col${colStart}row${rowStart}`,
            `col${colEnd}row${rowEnd}`
        );
        if (path !== undefined) {
            this.setState({ isButtonDisabled: true });
        }
        animate(visited, path);
        this.disableUntilAnimationFinishes();
    }

    handleOnMouseDown(row, col) {
        const { nodes } = this.state;
        this.setState({ isMouseDown: true });
        const newNodes = graphWithAddedRemovedWall(nodes, row, col);
        this.setState({ nodes: newNodes });
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

    render() {
        const { nodes, isButtonDisabled } = this.state;
        return (
            <div className="App container">
                <ControlPanel
                    isButtonDisabled={isButtonDisabled}
                    visualize={this.visualize}
                />
                <div
                    role="button"
                    tabIndex="0"
                    className="grid-container row justify-content-center"
                >
                    {nodes.map((l) => {
                        return l.map((node) => {
                            const { isPath, name, row, col, isWall } = node;
                            return (
                                <Node
                                    isPath={isPath}
                                    name={name}
                                    row={row}
                                    col={col}
                                    isWall={isWall}
                                    onMouseDown={
                                        () => this.handleOnMouseDown(row, col)
                                        // eslint-disable-next-line
                                    }
                                    onMouseUp={this.handleOnMouseUp}
                                    onMouseEnter={
                                        () => this.handleOnMouseEnter(row, col)
                                        // eslint-disable-next-line
                                    }
                                />
                            );
                        });
                    })}
                </div>
            </div>
        );
    }
}

export default App;
