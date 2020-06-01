import React from "react";
import Node from "../Node/Node";
import "./App.css";
import toGraph from "../util/toGraph";
import dijkstras from "../util/dijkstra";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nodes: [] };
    }

    componentDidMount() {
        const { nodes } = this.state;
        for (let i = 0; i < 20; i += 1) {
            const row = [];
            for (let j = 0; j < 20; j += 1) {
                row.push(<Node path="false" name={`col${j + 1}row${i + 1}`} />);
            }
            this.setState({ nodes: nodes.push(row) });
        }
        const graph = toGraph(nodes);
        const path = dijkstras(graph, "col5row16", "col12row20");
        for (let i = 0; i < 20; i += 1) {
            for (let j = 0; j < 20; j += 1) {
                if (path.includes(nodes[i][j].props.name)) {
                    this.setState(() => {
                        nodes[i][j] = (
                            <Node path="true" name={`col${j + 1}row${i + 1}`} />
                        );
                        return { nodes };
                    });
                }
            }
        }
    }

    render() {
        const { nodes } = this.state;
        return (
            <div className="App">
                <div className="grid-container">{nodes}</div>
            </div>
        );
    }
}
export default App;
