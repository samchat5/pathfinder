/* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/control-has-associated-label */

import React from "react";
import Node from "../Node/Node";
import "./App.css";
// import toGraph from "../util/toGraph";
// import dijkstras from "../util/dijkstra";

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

const graphWithAddedWall = (nodes, row, col) => {
    const newNodes = nodes;
    newNodes[row - 1][col - 1].isWall = true;
    return newNodes;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodes: [], isMouseDown: false };
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    }

    componentDidMount() {
        const nodes = getInitialNodes();
        this.setState({ nodes });
    }

    componentDidUpdate() {
        /* TO DO */
    }

    handleOnMouseDown(row, col) {
        const { nodes } = this.state;
        this.setState({ isMouseDown: true });
        const newNodes = graphWithAddedWall(nodes, row, col);
        this.setState({ nodes: newNodes });
    }

    handleOnMouseUp() {
        this.setState({ isMouseDown: false });
    }

    handleOnMouseEnter(row, col) {
        const { isMouseDown, nodes } = this.state;
        if (isMouseDown) {
            const newNodes = graphWithAddedWall(nodes, row, col);
            this.setState({ nodes: newNodes });
        }
    }

    render() {
        const { nodes } = this.state;
        return (
            <div className="App">
                <div role="button" tabIndex="0" className="grid-container">
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
