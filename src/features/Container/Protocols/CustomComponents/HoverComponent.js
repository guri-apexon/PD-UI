import Tooltip from 'apollo-react/components/Tooltip';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Plus from 'apollo-react-icons/Plus';
import { v4 as uuidv4 } from 'uuid';
import './hoverComponent.scss';

import {
  TableElement,
  TextElement,
  TextHeader2,
  ImageElement,
} from './MenuItems';

function HoverComponent({ line_id, hoverIndex, handleAddSegment }) {
  const menuItems = [
    {
      label: <TableElement />,
      onClick: handleAddSegment('table'),
    },
    {
      text: <TextElement />,
      onClick: handleAddSegment('text'),
    },
    {
      text: <TextHeader2 />,
      onClick: handleAddSegment('header'),
    },
    {
      text: <ImageElement />,
      onClick: handleAddSegment('image'),
    },
  ];
  return (
    <div
      // className="no-option"
      className={
        line_id === hoverIndex ? 'contentmenu show' : 'contentmenu hide'
      }
    >
      <Tooltip
        className="tooltip-add-element"
        title="Actions"
        disableFocusListener
      >
        <IconMenuButton
          className="icon-buttons"
          id={uuidv4()}
          menuItems={menuItems}
        >
          <Plus className="plus-icon" size="small" />
        </IconMenuButton>
      </Tooltip>
    </div>
  );
}

export default HoverComponent;
