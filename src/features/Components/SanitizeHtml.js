import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import replaceall from 'replaceall';

import { createFullMarkup } from '../../utils/utilFunction';

const defaultOptions = {
  ALLOWED_TAGS: ['a', 'div', 'span', 'p', 'b'],
  ALLOWED_ATTR: ['style', 'class'],
};
function SanitizeHTML({ content, options, clinicalTerms }) {
  const [innerHTML, setInnerHTML] = useState('');

  const replaceWithEnriched = (terms) => {
    let text = content;
    terms.forEach((term) => {
      text = replaceall(term, `<b class="enriched-txt">${term}</b>`, content);
    });

    return text;
  };

  const sanitize = (text, options) => {
    let txt = text;
    if (clinicalTerms) {
      const terms = Object.keys(clinicalTerms);
      if (terms.length > 0) {
        // eslint-disable-next-line
        txt = replaceWithEnriched(terms);
      }
    }
    const dirty = createFullMarkup(txt);
    console.log({ dirty });
    // eslint-disable-next-line no-underscore-dangle
    const clean = DOMPurify.sanitize(dirty.__html || dirty, {
      ...defaultOptions,
      ...options,
    });

    const x = { __html: clean };
    console.log({ x });

    return x;
  };

  useEffect(() => {
    console.log(innerHTML);
  }, [innerHTML]);

  // eslint-disable-next-line
  // return <div dangerouslySetInnerHTML={innerHTML} />;

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={sanitize(content, options)} />;
  // return (
  //   <div>
  //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  //     tempor incididunt ut labore et dolore magna aliqua.
  //   </div>
  // );
}

export default SanitizeHTML;

SanitizeHTML.propTypes = {
  content: PropTypes.isRequired,
  options: PropTypes.isRequired,
  clinicalTerms: PropTypes.isRequired,
};
