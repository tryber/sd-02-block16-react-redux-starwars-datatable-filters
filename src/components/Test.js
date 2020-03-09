import React from 'react';
import PropTypes from 'prop-types';

function Test({ text }) {
  return (
    <div>{`This is a test: ${text}`}</div>
  );
}

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
