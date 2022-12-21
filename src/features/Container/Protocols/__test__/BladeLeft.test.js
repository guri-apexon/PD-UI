import { useState } from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import BladeLeft from '../BladeLeft/BladeLeft';

function Testing() {
  const [open, setOpen] = useState(true);
  const [expand, setExpand] = useState(false);
  return <BladeLeft value={(open, expand)} setValue={(setOpen, setExpand)} />;
}

// function Testing2() {
//   const [expand, setExpand] = useState(false);
//   const onChange = ({ e, expanded }) => {
//     setExpand(expanded);
//   };
//   return <BladeLeft onChange setExpand={expand} />;
// }

describe.only('leftBlade should Opne when Click', () => {
  test('Open LeftBlade', () => {
    const { container } = render(<Testing />);
    screen.debug(undefined, Infinity);

    fireEvent.click(
      container.getElementsByClassName('Blade-expandPanelButton-309'),
    );
    screen.debug(undefined, Infinity);
  });
});
