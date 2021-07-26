import React from 'react';
import PropTypes from 'prop-types'
import '../styles/Error.css';
const Error = ({message}) => {
    return (
        <div className="alert error">
            <p>{message}</p>
        </div>
    );
}
Error.propTypes = {
    message: PropTypes.string.isRequired
}
export default Error;