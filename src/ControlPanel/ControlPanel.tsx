import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";

const SIZE = 31;

function ControlPanel(
    props: InferProps<typeof ControlPanel.propTypes>
): JSX.Element {
    const [colStart, setColStart] = useState(2);
    const [colEnd, setColEnd] = useState(SIZE - 1);
    const [rowStart, setRowStart] = useState(2);
    const [rowEnd, setRowEnd] = useState(SIZE - 1);

    const {
        changeStart,
        changeTarget,
        isButtonDisabled,
        visualize,
        generateGrid,
        generateGridDisabled,
        resetGrid,
    } = props;

    const useInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;
        const { name } = target;
        const val = Number(target.value);
        if (name === "colStart") {
            setColStart(val);
            changeStart(val, rowStart);
        } else if (name === "rowStart") {
            setRowStart(val);
            changeStart(colStart, val);
        } else if (name === "colEnd") {
            setColEnd(val);
            changeTarget(val, rowEnd);
        } else {
            setRowEnd(val);
            changeTarget(colEnd, val);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        visualize(rowStart, colStart, rowEnd, colEnd);
        e.preventDefault();
    };

    const reset = (): void => {
        setColEnd(SIZE - 1);
        setColStart(2);
        setRowStart(2);
        setRowEnd(SIZE - 1);
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
                onChange={useInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="colEnd"
                className="form-control"
                onChange={useInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="rowStart"
                className="form-control"
                onChange={useInputChange}
            />
            <input
                type="number"
                max={SIZE}
                min="1"
                name="rowEnd"
                className="form-control"
                onChange={useInputChange}
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
