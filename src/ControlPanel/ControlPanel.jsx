import React from "react";
import PropTypes from "prop-types";

const SIZE = 31;

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colStart: 2,
            colEnd: SIZE - 1,
            rowStart: 2,
            rowEnd: SIZE - 1,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleInputChange(e) {
        const { changeStart, changeTarget } = this.props;
        const { target } = e;
        const { name } = target;
        this.setState(
            {
                [name]: Number(target.value),
            },
            () => {
                const { colStart, colEnd, rowEnd, rowStart } = this.state;
                if (name === "colStart" || name === "rowStart") {
                    changeStart(colStart, rowStart);
                } else {
                    changeTarget(colEnd, rowEnd);
                }
            }
        );
    }

    handleSubmit(e) {
        const { visualize } = this.props;
        const { rowEnd, colEnd, rowStart, colStart } = this.state;
        visualize(rowStart, colStart, rowEnd, colEnd);
        e.preventDefault();
    }

    reset() {
        const { resetGrid } = this.props;
        this.setState({
            colEnd: SIZE - 1,
            colStart: 2,
            rowStart: 2,
            rowEnd: SIZE - 1,
        });
        resetGrid();
    }

    render() {
        const {
            isButtonDisabled,
            generateGrid,
            generateGridDisabled,
        } = this.props;
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
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max={SIZE}
                    min="1"
                    name="colEnd"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max={SIZE}
                    min="1"
                    name="rowStart"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max={SIZE}
                    min="1"
                    name="rowEnd"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <button
                    onClick={this.handleSubmit}
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
                <button
                    onClick={this.reset}
                    type="submit"
                    className="btn btn-primary"
                >
                    Reset
                </button>
            </div>
        );
    }
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
