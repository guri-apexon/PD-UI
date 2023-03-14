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
  const { settingItems, tableData, hideGroupsColumns } = state;
  const createFilters = (key) => {
    const filters = tableData.filter((item) => {
      return item.groupId === key && !item.headerRow;
    });
    const items = filters.map((item) => {
      return (
        <Typography
          key={uuid()}
          className="setting-item"
          onClick={() => {
            dispatch({
              type: TableEvents.FILTER_GROUP_COLUMN,
              payload: item[key],
            });
          }}
        >
          {hideGroupsColumns.includes(item[key]) ? (
            <CheckboxUnchecked />
          ) : (
            <CheckboxChecked />
          )}

          <Typography> {item[key]}</Typography>
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
        {settingItems.map((item) => {
          const key = Object.keys(item)[0];
          const value = Object.values(item)[0];
          return (
            <Accordion
              key={uuid()}
              id={key}
              expanded={expands.includes(key)}
              onChange={onChange}
            >
              <AccordionSummary>
                <Typography>{value}</Typography>
              </AccordionSummary>
              {createFilters(key)}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
