import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import replaceall from 'replaceall';

import { createFullMarkup } from '../../utils/utilFunction';

const defaultOptions = {
  ALLOWED_TAGS: ['a', 'div', 'span', 'p', 'b'],
  ALLOWED_ATTR: ['style', 'class'],
};
function SanitizeHTML({ html, options, clinicalTerms }) {
  const [innerHTML, setInnerHTML] = useState('');

  const replaceWithEnriched = (terms) => {
    let text = html;
    terms.forEach((term) => {
      text = replaceall(term, `<b class="enriched-txt">${term}</b>`, html);
    });

    return text;
  };

  const sanitize = (content, options) => {
    // eslint-disable-next-line
    const dirty = createFullMarkup(content);
    console.log({ dirty });
    // eslint-disable-next-line no-underscore-dangle
    const clean = DOMPurify.sanitize(dirty.__html || dirty, {
      ...defaultOptions,
      ...options,
    });
    return clean;
  };

  useEffect(() => {
    if (clinicalTerms) {
      const terms = Object.keys(clinicalTerms);
      if (terms.length > 0) {
        const text = replaceWithEnriched(terms);
        // console.log({ text });
        const txt = sanitize(text, options);
        // console.log(txt);
        setInnerHTML({ __html: txt });
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(innerHTML);
  }, [innerHTML]);

  // eslint-disable-next-line
  // return <div dangerouslySetInnerHTML={innerHTML} />;
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </div>
  );
}

export default SanitizeHTML;

SanitizeHTML.propTypes = {
  html: PropTypes.isRequired,
  options: PropTypes.isRequired,
  clinicalTerms: PropTypes.isRequired,
};
