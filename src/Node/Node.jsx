import React from "react";
import PropTypes from "prop-types";
import "./Node.css";

const Node = (props) => {
    const { name } = props;
    const { path } = props;
    return <div id={name} className={`Node ${path}`} />;
};

Node.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export default Node;
