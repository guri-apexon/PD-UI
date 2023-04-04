import PropTypes from 'prop-types';
import '../SOA.scss';

function HeaderGroupComponent({ displayName }) {
  return <span className="header-cell">{displayName}</span>;
}
HeaderGroupComponent.propTypes = {
  displayName: PropTypes.isRequired,
};
export default HeaderGroupComponent;
