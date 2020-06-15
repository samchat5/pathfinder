import React, { forwardRef, Ref } from "react";
import PropTypes, { InferProps } from "prop-types";
import Node from "../Node/Node";
import NodeObj from "../NodeInterface";

const GridContainerProps = {
    nodes: PropTypes.arrayOf(PropTypes.any).isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
};

const GridContainer = forwardRef(
    (
        props: InferProps<typeof GridContainerProps>,
        ref: Ref<HTMLDivElement>
    ) => {
        const { nodes, onMouseDown, onMouseEnter, onMouseUp } = props;
        return (
            <div
                role="button"
                tabIndex={0}
                id="grid-container"
                ref={ref}
                className="grid-container row justify-content-center"
            >
                {nodes.map((l) => {
                    return l.map((node: NodeObj) => {
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
                                onMouseDown={(): void => onMouseDown(row, col)}
                                onMouseUp={onMouseUp}
                                onMouseEnter={
                                    (): void => onMouseEnter(row, col)
                                    // eslint-ignore-next-line
                                }
                            />
                        );
                    });
                })}
            </div>
        );
    }
);

export default GridContainer;
