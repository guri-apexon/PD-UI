import { useContext } from 'react';
import Tooltip from 'apollo-react/components/Tooltip';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Plus from 'apollo-react-icons/Plus';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';
import './hoverComponent.scss';
import { TableElement, TextElement, TextHeader2 } from './MenuItems';
import { ProtocolContext, useProtContext } from '../ProtocolContext';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';

function HoverComponent({ lineId, activeLineID }) {
  const { dispatchSectionEvent } = useProtContext();
  const handleAddSegment = (type) => {
    dispatchSectionEvent('CONTENT_ADDED', { type, lineId });
  };
  const menuItems = [
    {
      text: <TextElement />,
      onClick: () => handleAddSegment(CONTENT_TYPE.TEXT),
    },
    {
      text: <TextHeader2 />,
      onClick: () => handleAddSegment(CONTENT_TYPE.HEADER),
    },
    {
      label: <TableElement />,
      onClick: () => handleAddSegment(CONTENT_TYPE.TABLE),
    },
  ];
  return (
    <div
      // className="no-option"
      data-testId="hover-component"
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
          id="addContentMenu"
          menuItems={menuItems}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          size="small"
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
};
