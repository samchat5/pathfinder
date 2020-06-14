import React from "react";
import PropTypes from "prop-types";
import Node from "../Node/Node";

class GridContainer extends React.Component {
    render() {
        const {
            nodes,
            forwardRef,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        return (
            <div
                role="button"
                tabIndex="0"
                id="grid-container"
                ref={forwardRef}
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
    }
}

GridContainer.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.any).isRequired,
    forwardRef: PropTypes.objectOf(PropTypes.any).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => (
    // eslint-disable-next-line
    <GridContainer forwardRef={ref} {...props} />
));
