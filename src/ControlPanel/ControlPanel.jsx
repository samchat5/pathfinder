import React, { useState } from "react";
import PropTypes from "prop-types";

const SIZE = 31;

function ControlPanel(props) {
    const [state, setState] = useState({
        colStart: 2,
        colEnd: SIZE - 1,
        rowStart: 2,
        rowEnd: SIZE - 1,
    });
    const {
        changeStart,
        changeTarget,
        isButtonDisabled,
        visualize,
        generateGrid,
        generateGridDisabled,
        resetGrid,
    } = props;

    const handleInputChange = (e) => {
        const { target } = e;
        const { name } = target;
        setState(
            {
                [name]: Number(target.value),
            },
            () => {
                const { colStart, colEnd, rowEnd, rowStart } = state;
                if (name === "colStart" || name === "rowStart") {
                    changeStart(colStart, rowStart);
                } else {
                    changeTarget(colEnd, rowEnd);
                }
            }
        );
    };

    const handleSubmit = (e) => {
        const { rowEnd, colEnd, rowStart, colStart } = state;
        visualize(rowStart, colStart, rowEnd, colEnd);
        e.preventDefault();
    };

    const reset = () => {
        setState({
            colEnd: SIZE - 1,
            colStart: 2,
            rowStart: 2,
            rowEnd: SIZE - 1,
        });
        resetGrid();
    };

    return (
        <div className="row my-3 justify-content-center input-group">
            <div className="input-group-prepend">
                <span id="startcol" className="input-group-text">
                    Start Col | End col | Start row | End row
                </span>
            </div>
            <input
                type="number"
                name="colStart"
                max={SIZE}
                min="1"
                className="form-control"
                onChange={handleInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="colEnd"
                className="form-control"
                onChange={handleInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="rowStart"
                className="form-control"
                onChange={handleInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="rowEnd"
                className="form-control"
                onChange={handleInputChange}
            />
            <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
                disabled={isButtonDisabled}
            >
                Press to graph
            </button>
            <button
                onClick={generateGrid}
                disabled={generateGridDisabled}
                type="submit"
                className="btn btn-primary"
            >
                Press for grid
            </button>
            <button onClick={reset} type="submit" className="btn btn-primary">
                Reset
            </button>
        </div>
    );
}

ControlPanel.propTypes = {
    visualize: PropTypes.func.isRequired,
    isButtonDisabled: PropTypes.bool.isRequired,
    changeStart: PropTypes.func.isRequired,
    changeTarget: PropTypes.func.isRequired,
    generateGrid: PropTypes.func.isRequired,
    generateGridDisabled: PropTypes.bool.isRequired,
    resetGrid: PropTypes.func.isRequired,
};

export default ControlPanel;
