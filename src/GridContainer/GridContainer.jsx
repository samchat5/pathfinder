import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Node from "../Node/Node";

const GridContainer = forwardRef((props, ref) => {
    const { nodes, onMouseDown, onMouseEnter, onMouseUp } = props;
    return (
        <div
            role="button"
            tabIndex="0"
            id="grid-container"
            ref={ref}
            className="grid-container row justify-content-center"
        >
            {nodes.map((l) => {
                return l.map((node) => {
                    const {
                        isPath,
                        name,
                        row,
                        col,
                        isWall,
                        isTarget,
                        isStart,
                        isVisited,
                    } = node;
                    return (
                        <Node
                            isPath={isPath}
                            name={name}
                            row={row}
                            col={col}
                            isWall={isWall}
                            isTarget={isTarget}
                            isStart={isStart}
                            isVisited={isVisited}
                            onMouseDown={() => onMouseDown(row, col)}
                            onMouseUp={onMouseUp}
                            onMouseEnter={() => onMouseEnter(row, col)}
                        />
                    );
                });
            })}
        </div>
    );
});

GridContainer.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.any).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
};

export default GridContainer;
