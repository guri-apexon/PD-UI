import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render } from '../../../../test-utils/test-utils';
import BladeLeft from '../BladeLeft/BladeLeft';

const initialState = {
  protocol: {
    protocolTocData: { tocData: { data: [{ source_file_section: '' }] } },
  },
};
// function Testing() {
//   const [open, setOpen] = useState(true);
//   const [expand, setExpand] = useState(false);
//   return (
//     <BladeLeft
//       value={(open, expand)}
//       setValue={(setOpen, setExpand)}
//       dataSummary={{ id: 1 }}
//     />
//   );
// }

// function Testing2() {
//   const [expand, setExpand] = useState(false);
//   const onChange = ({ e, expanded }) => {
//     setExpand(expanded);
//   };
//   return <BladeLeft onChange setExpand={expand} />;
// }

describe.only('leftBlade should Opne when Click', () => {
  test('Open LeftBlade', () => {
    const screen = render(
      <BladeLeft dataSummary={{ id: 1 }} handlePageNo={() => jest.fn()} />,
      {
        initialState,
      },
    );
    const BladeEl = screen.getByTestId('toc-component');
    userEvent.click(BladeEl.querySelector('svg'));
    screen.debug();
    userEvent.click(BladeEl.querySelector('svg'));
    // userEvent.click(screen.getByClass('MuiBackdrop-root'));
    // fireEvent.click(BladeEl.querySelector("button[class^='Blade-closeIcon-']"));
  });
});
