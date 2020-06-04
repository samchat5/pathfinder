import React from "react";
import PropTypes from "prop-types";

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colStart: 1,
            colEnd: 20,
            rowStart: 1,
            rowEnd: 20,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const { target } = e;
        const { name } = target;
        this.setState({
            [name]: target.value,
        });
    }

    handleSubmit(e) {
        const { visualize } = this.props;
        const { rowEnd, colEnd, rowStart, colStart } = this.state;
        visualize(rowStart, colStart, rowEnd, colEnd);
        e.preventDefault();
    }

    render() {
        const { isButtonDisabled } = this.props;
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
                    max="20"
                    min="1"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max="20"
                    min="1"
                    name="colEnd"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max="20"
                    min="1"
                    name="rowStart"
                    className="form-control"
                    onChange={this.handleInputChange}
                />
                <input
                    type="number"
                    max="20"
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
            </div>
        );
    }
}

ControlPanel.propTypes = {
    visualize: PropTypes.func.isRequired,
    isButtonDisabled: PropTypes.bool.isRequired,
};

export default ControlPanel;
