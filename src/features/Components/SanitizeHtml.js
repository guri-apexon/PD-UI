import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

function SanitizeHTML({ html, options }) {
  const defaultOptions = {
    ALLOWED_TAGS: [
      'a',
      'div',
      'span',
      'p',
      'b',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'table',
      'td',
      'tr',
      'tfoot',
      'u',
      'strike',
      'i',
      'sup',
      'sub',
      'li',
      'ul',
    ],
    ALLOWED_ATTR: ['style', 'class'],
  };

  const sanitize = (dirty, options) => {
    // eslint-disable-next-line
    const clean = DOMPurify.sanitize(dirty?.__html || dirty, {
      ...defaultOptions,
      ...options,
    });
    return {
      __html: clean,
    };
  };
  // eslint-disable-next-line
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}

export default SanitizeHTML;

SanitizeHTML.propTypes = {
  html: PropTypes.isRequired,
  options: PropTypes.isRequired,
};
