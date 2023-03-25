import Accordion from 'apollo-react/components/Accordion';
import AccordionSummary from 'apollo-react/components/AccordionSummary';
import Typography from 'apollo-react/components/Typography';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CheckboxChecked from 'apollo-react-icons/CheckboxChecked';
import CheckboxUnchecked from 'apollo-react-icons/CheckboxUnchecked';
import TabelContext from './Context';
import './styles.css';
import { TableEvents } from './Constants';

function SideNav() {
  const [expands, setExpands] = useState([]);
  const { state, dispatch } = useContext(TabelContext);
  const { settingItems, hideGroupsColumns } = state;
  const createFilters = (key) => {
    const currentObject = settingItems[key];
    const filters =
      currentObject && currentObject.children ? currentObject.children : [];

    const items = filters.map((item) => {
      return (
        <Typography
          key={uuid()}
          data-testid={item.name}
          className="setting-item"
          onClick={() => {
            if (item.enable) {
              const type = hideGroupsColumns.includes(item.name);
              console.log('type', type);
              dispatch({
                type: TableEvents.FILTER_GROUP_COLUMN,
                payload: { name: item.name, push: type },
              });
            }
          }}
        >
          {hideGroupsColumns.includes(item.name) || !item.enable ? (
            <CheckboxUnchecked />
          ) : (
            <CheckboxChecked />
          )}

          <Typography> {item.name}</Typography>
        </Typography>
      );
    });
    return items;
  };
  const onChange = (event, value) => {
    const id = event?.currentTarget?.parentNode?.id;
    if (value) {
      setExpands((prev) => [...prev, id]);
    } else {
      const arr = expands.filter((item) => item !== id);
      setExpands(arr);
    }
  };
  return (
    <div>
      <div className="side-nav" data-testid="side-nav">
        {Object.keys(settingItems).map((item) => {
          return (
            <Accordion
              key={uuid()}
              id={item}
              data-testid={item}
              expanded={expands.includes(item)}
              onChange={onChange}
            >
              <AccordionSummary>
                <Typography>{settingItems[item].name}</Typography>
              </AccordionSummary>
              {createFilters(item)}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;