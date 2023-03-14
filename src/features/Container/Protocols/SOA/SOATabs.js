import { useContext } from 'react';
import SegmentedControl from 'apollo-react/components/SegmentedControl';
import SegmentedControlGroup from 'apollo-react/components/SegmentedControlGroup';
import { v4 as uuid } from 'uuid';
import TabelContext from './Context';
import { TableEvents } from './Constants';

function SOATabs() {
  const { state, dispatch } = useContext(TabelContext);
  const { selectedTab, tables } = state;

  return (
    <div>
      <SegmentedControlGroup
        value={String(selectedTab)}
        exclusive
        onChange={(event, value) => {
          dispatch({ type: TableEvents.SET_SELECTED_TAB, payload: value });
        }}
      >
        {tables.map((item, index) => {
          return (
            <SegmentedControl
              key={uuid()}
              value={index}
              selected={index === selectedTab}
            >
              Tab {index + 1}{' '}
            </SegmentedControl>
          );
        })}
      </SegmentedControlGroup>
    </div>
  );
}
export default SOATabs;
