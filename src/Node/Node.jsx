/* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/control-has-associated-label */

import React from "react";
import PropTypes from "prop-types";
import "./Node.css";

class Node extends React.PureComponent {
    renderNode() {
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
        const wall = isWall ? "wall" : "";
        return (
            <div
                tabIndex="0"
                role="button"
                id={name}
                className={`Node ${isPath} ${wall}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={onMouseUp}
                onMouseEnter={() => onMouseEnter(row, col)}
            />
        );
    }

    renderStart() {
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
        const wall = isWall ? "wall" : "";
        return (
            <div
                tabIndex="0"
                role="button"
                id={name}
                className={`Node ${isPath} ${wall}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={onMouseUp}
                onMouseEnter={() => onMouseEnter(row, col)}
            >
                <svg
                    className="bi bi-house-fill align-baseline"
                    width="18px"
                    height="18px"
                    viewBox="0 0 16 16"
                    fill="purple"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                </svg>
            </div>
        );
    }

    renderTarget() {
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
        const wall = isWall ? "wall" : "";
        return (
            <div
                tabIndex="0"
                role="button"
                id={name}
                className={`Node ${isPath} ${wall}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={onMouseUp}
                onMouseEnter={() => onMouseEnter(row, col)}
            >
                <svg
                    className="bi bi-bullseye target align-baseline"
                    width="18px"
                    height="18px"
                    viewBox="0 0 16 16"
                    fill="purple"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                    />
                    <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </div>
        );
    }

    render() {
        const { isTarget, isStart } = this.props;
        if (isTarget) {
            return this.renderTarget();
        }
        if (isStart) {
            return this.renderStart();
        }
        return this.renderNode();
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
    isTarget: PropTypes.bool.isRequired,
    isStart: PropTypes.bool.isRequired,
};

export default Node;
