import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

function SanitizeHTML({ html, options }) {
  const defaultOptions = {
    ALLOWED_TAGS: ['a', 'div', 'span', 'p'],
    ALLOWED_ATTR: ['style'],
    // and many extra configurations
  };

  const sanitize = (dirty, options) => {
    // eslint-disable-next-line
    const clean = DOMPurify.sanitize((dirty.__html || dirty), { ...defaultOptions, ...options });
    return {
      __html: clean,
    };
  };
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}

export default SanitizeHTML;

SanitizeHTML.propTypes = {
  html: PropTypes.isRequired,
  options: PropTypes.isRequired,
};
