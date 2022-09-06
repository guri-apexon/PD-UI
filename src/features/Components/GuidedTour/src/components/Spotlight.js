import React from 'react';
import PropTypes from 'prop-types';
import Arrow2Up from 'apollo-react-icons/Arrow2Up';

function JoyrideSpotlight({ styles }) {
  return (
    <div key="JoyrideSpotlight" className="react-joyride__spotlight" style={styles}>
      <div
        className="arrow-container"
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          top: '80%',
        }}>
        <span align="center">
          <Arrow2Up style={{ color: 'white' }} />
        </span>
      </div>
    </div>
  );
}

JoyrideSpotlight.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default JoyrideSpotlight;
