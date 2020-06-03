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

const graphWithAddedPath = (nodes, path) => {
    const newNodes = nodes;
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (path.includes(nodes[i][j].name)) {
                newNodes[i][j].isPath = true;
            } else {
                newNodes[i][j].isPath = false;
            }
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

    visualize(rowStart, colStart, rowEnd, colEnd) {
        const { nodes } = this.state;
        const graph = toGraph(nodes);
        const path = dijkstras(
            graph,
            `col${colStart}row${rowStart}`,
            `col${colEnd}row${rowEnd}`
        );
        const newNodes = graphWithAddedPath(nodes, path);
        this.setState({ nodes: newNodes, isMouseDown: false });
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

    changeStateFromChild(stateTarget, data) {
        this.setState((prevState) => {
            const newState = prevState;
            newState[stateTarget] = data;
            return newState;
        });
    }

    render() {
        const { nodes } = this.state;
        return (
            <div className="App container">
                <ControlPanel visualize={this.visualize} />
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
