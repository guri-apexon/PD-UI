import { useContext } from 'react';
import Button from 'apollo-react/components/Button';
import { v4 as uuid } from 'uuid';
import TabelContext from './Context';
import { TableEvents } from './Constants';

function SOATabs() {
  const { state, dispatch } = useContext(TabelContext);
  const { selectedTab, tables } = state;
  const onChangeHandler = (value) => {
    if (Number(value) !== Number(selectedTab)) {
      dispatch({ type: TableEvents.SET_SELECTED_TAB, payload: value });
    }
  };
  return (
    <div>
      {tables.map((item, index) => {
        return (
          <Button
            className={index === selectedTab ? 'cursor-default' : 'hand-cursor'}
            onClick={() => onChangeHandler(index)}
            data-testid={`tab${index}`}
            key={uuid()}
            value={index}
            variant={index === selectedTab ? 'primary' : ''}
          >
            Tab {index + 1}
          </Button>
        );
      })}
    </div>
  );
}
export default SOATabs;
