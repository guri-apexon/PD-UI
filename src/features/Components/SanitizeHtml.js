import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

function SanitizeHTML({ html, options }) {
  const defaultOptions = {
    ALLOWED_TAGS: ['a', 'div', 'span', 'p'],
    ALLOWED_ATTR: ['style'],
    // and many extra configurations
  };

  const sanitize = (dirty, options) => {
    // eslint-disable-next-line
    const clean = DOMPurify.sanitize(dirty.__html || dirty, {
      ...defaultOptions,
      ...options,
    });
    return {
      __html: clean,
    };
  };
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}

export default SanitizeHTML;

SanitizeHTML.propTypes = {
  html: PropTypes.isRequired,
  options: PropTypes.isRequired,
};
