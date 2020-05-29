import React from "react";
import Node from "../Node/Node";
import "./App.css";

function App() {
    const nodes = [];
    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {
            nodes.push(<Node />);
        }
    }
    return (
        <div className="App">
            <div className="grid-container">{nodes}</div>
        </div>
    );
}
export default App;
