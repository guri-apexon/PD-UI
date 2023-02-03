import PropTypes from 'prop-types';
import SanitizeHTML from '../../../../../Components/SanitizeHtml';

function HoverList({ data, handleOperation, index }) {
  const handleClick = (operation) => {
    handleOperation(operation, index);
  };
  return (
    <div className="pd-dropdown">
      <ul>
        {data.map((item) => (
          // eslint-disable-next-line
          <li key={item.id} onClick={() => handleClick(item.id)}>
            {/* eslint-disable-next-line */}
            <div className="pd-arrow-icon">
              <SanitizeHTML html={item.image} />
            </div>
            <div className="sd-text">{item.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HoverList;

HoverList.propTypes = {
  data: PropTypes.isRequired,
  handleOperation: PropTypes.isRequired,
  index: PropTypes.isRequired,
};
