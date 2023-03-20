import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'apollo-react';

function LinkRef({ content }) {
  return (
    <div>
      <Typography>
        <a href={content}>{content}</a>
      </Typography>
    </div>
  );
}

export default LinkRef;

LinkRef.propTypes = {
  content: PropTypes.isRequired,
};
