import PropTypes from 'prop-types';
import TreeItem from 'apollo-react/components/TreeItem';
import ChevronRight from 'apollo-react-icons/ChevronRight';
import ChevronDown from 'apollo-react-icons/ChevronDown';
import Tooltip from 'apollo-react/components/Tooltip';
import SanitizeHTML from '../../../Components/SanitizeHtml';
import {
  createFullMarkup,
  removeHtmlTags,
} from '../../../../utils/utilFunction';

function AccordionToc({
  level,
  sectionIndex,
  handlePageNo,
  subAccComponent,
  expanded,
  handleChange,
}) {
  const handleClick = (e) => {
    if (level.levelNumber) handleChange(sectionIndex, level.link_id);
    handlePageNo(e, level.page, sectionIndex);
  };

  return (
    <Tooltip
      className="tooltip"
      title={removeHtmlTags(level.source_file_section)}
    >
      <TreeItem
        key={level.link_id}
        label={
          <SanitizeHTML html={createFullMarkup(level?.source_file_section)} />
        }
        onClick={handleClick}
        nodeId={level.link_id}
        className={
          expanded.includes(level.link_id) ? 'label-bold' : 'label-lighter'
        }
        icon={
          expanded.includes(level.link_id) ? <ChevronDown /> : <ChevronRight />
        }
      >
        {subAccComponent}
      </TreeItem>
    </Tooltip>
  );
}

export default AccordionToc;

AccordionToc.propTypes = {
  level: PropTypes.isRequired,
  sectionIndex: PropTypes.isRequired,
  handlePageNo: PropTypes.isRequired,
  subAccComponent: PropTypes.isRequired,
  expanded: PropTypes.isRequired,
  handleChange: PropTypes.isRequired,
};
