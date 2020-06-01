import React from "react";
import PropTypes from "prop-types";
import "./Node.css";

class Node extends React.PureComponent {
    render() {
        const { name } = this.props;
        const { path } = this.props;
        return <div id={name} className={`Node ${path}`} />;
    }
}

Node.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Node;
