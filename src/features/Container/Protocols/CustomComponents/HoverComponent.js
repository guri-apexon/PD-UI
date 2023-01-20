import Tooltip from 'apollo-react/components/Tooltip';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Plus from 'apollo-react-icons/Plus';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';
import './hoverComponent.scss';

import { text, header } from './constants';

import { TextElement, TextHeader2 } from './MenuItems';

function HoverComponent({ lineId, activeLineID, handleAddSegment }) {
  const menuItems = [
    {
      text: <TextElement />,
      onClick: handleAddSegment(text, lineId),
    },
    {
      text: <TextHeader2 />,
      onClick: handleAddSegment(header, lineId),
    },
  ];
  return (
    <div
      // className="no-option"
      className={
        lineId === activeLineID ? 'contentmenu show' : 'contentmenu hide'
      }
    >
      <Tooltip
        className="tooltip-add-element"
        title="Actions"
        disableFocusListener
        placement="left"
      >
        <IconMenuButton
          className="icon-buttons"
          id={uuidv4()}
          menuItems={menuItems}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Plus className="plus-icon" size="small" />
        </IconMenuButton>
      </Tooltip>
    </div>
  );
}

export default HoverComponent;

HoverComponent.propTypes = {
  lineId: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  handleAddSegment: PropTypes.isRequired,
};
