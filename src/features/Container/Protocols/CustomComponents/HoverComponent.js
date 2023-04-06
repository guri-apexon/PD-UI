import Tooltip from 'apollo-react/components/Tooltip';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Plus from 'apollo-react-icons/Plus';
import PropTypes from 'prop-types';
import './hoverComponent.scss';
import {
  TableElement,
  TextElement,
  TextHeader2,
  ImageElement,
} from './MenuItems';
import { useProtContext } from '../ProtocolContext';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};
function HoverComponent({ lineId, activeLineID, disabled }) {
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
    {
      text: <ImageElement />,
      onClick: () => handleAddSegment(CONTENT_TYPE.IMAGE),
    },
  ];
  return (
    <div
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
          anchorOrigin={anchorOrigin}
          size="small"
          data-testId="addIcon"
          disabled={disabled}
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
  disabled: PropTypes.isRequired,
};
