/* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/control-has-associated-label */

import React from "react";
import PropTypes from "prop-types";
import "./Node.css";

class Node extends React.Component {
    render() {
        const {
            name,
            isPath,
            isWall,
            onMouseDown,
            onMouseUp,
            row,
            col,
            onMouseEnter,
        } = this.props;
        let wall;
        if (isWall) {
            wall = "wall";
        } else {
            wall = "";
        }
        return (
            <div
                tabIndex="0"
                role="button"
                id={name}
                className={`Node ${isPath} ${wall}`}
                onMouseOver={this.handleOnMouseOver}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={onMouseUp}
                onMouseEnter={() => onMouseEnter(row, col)}
            />
        );
    }
}

Node.propTypes = {
    name: PropTypes.string.isRequired,
    isPath: PropTypes.bool.isRequired,
    row: PropTypes.string.isRequired,
    col: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    isWall: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
};

export default Node;
