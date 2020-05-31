import React from "react";
import Node from "../Node/Node";
import "./App.css";
import toGraph from "../util/toGraph";
import dijkstras from "../util/dijkstra";

function App() {
    const nodes = [];
    for (let i = 0; i < 20; i += 1) {
        const row = [];
        for (let j = 0; j < 20; j += 1) {
            row.push(<Node path="false" name={`col${j + 1}row${i + 1}`} />);
        }
        nodes.push(row);
    }
    const graph = toGraph(nodes);
    const path = dijkstras(graph, "col5row16", "col12row20");
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            if (path.includes(nodes[i][j].props.name)) {
                nodes[i][j] = (
                    <Node path="true" name={`col${j + 1}row${i + 1}`} />
                );
            }
        }
    }
    return (
        <div className="App">
            <div className="grid-container">{nodes}</div>
        </div>
    );
}
export default App;
