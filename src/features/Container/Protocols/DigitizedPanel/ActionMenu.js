import { useState, useEffect } from 'react';
import Stethoscope from 'apollo-react-icons/Stethoscope';
import Pencil from 'apollo-react-icons/Pencil';
import Save from 'apollo-react-icons/Save';
import LinkIcon from 'apollo-react-icons/Link';
import EyeShow from 'apollo-react-icons/EyeShow';
import Button from 'apollo-react/components/Button';
import ArrowLeft from 'apollo-react-icons/ArrowLeft';
import ArrowRight from 'apollo-react-icons/ArrowRight';
import PropTypes from 'prop-types';
import './ActionMenu.scss';
import Typography from 'apollo-react/components/Typography';
import { AUDIT_LIST } from '../Constant/Constants';
import { renderAuditInfo } from './utils';

function ActionMenu({
  showedit,
  onEditClick,
  setShowEnrichedContent,
  setShowPrefferedTerm,
  showPrefferedTerm,
  showEnrichedContent,
  showLink,
  setShowLink,
  handleSaveContent,
  disabledSaveIcon,
  disabledPencilIcon,
  item,
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [clinicalTermstoggle, setClinicalTermsToggle] = useState(true);
  const [linkReferencetoggle, setLinkReferenceToggle] = useState(true);
  const [auditInformation, setAuditInformation] = useState([]);

  const pTIcon = () => {
    return (
      <span className={`ptIcon ${showPrefferedTerm ? 'active' : ''}`}>PT</span>
    );
  };

  const handlePrefferedTerm = () => {
    setSelectedTerm('PT');
    setToggle(!toggle);
    setShowPrefferedTerm(toggle);
  };

  const handleClinicalTerms = () => {
    setSelectedTerm('CT');
    setClinicalTermsToggle(!clinicalTermstoggle);
    setShowEnrichedContent(clinicalTermstoggle);
  };

  const handleLinkReference = () => {
    setSelectedTerm('link');
    setLinkReferenceToggle(!linkReferencetoggle);
    setShowLink(linkReferencetoggle);
  };

  useEffect(() => {
    if (item) {
      const auditData = Object.keys(item?.audit_info);
      setAuditInformation(auditData);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className={`action-menu ${expanded && 'expanded'} ${
        showedit && 'action-edit-menu'
      }`}
    >
      <div className="open-close" data-testId="openClosePanel">
        {expanded ? (
          <ArrowRight onClick={() => setExpanded(false)} />
        ) : (
          <ArrowLeft onClick={() => setExpanded(true)} />
        )}
      </div>

      <div className="menu-items">
        {!showedit ? (
          <span
            disabled={disabledPencilIcon}
            data-testId="pencilIcon"
            onClick={onEditClick}
            role="presentation"
          >
            <Button className="btn-icons">
              <Pencil />
              {expanded && 'Edit Content'}
            </Button>
          </span>
        ) : (
          <span>
            <Button
              onClick={handleSaveContent}
              data-testId="saveIcon"
              disabled={disabledSaveIcon}
              className={!disabledSaveIcon ? 'active_save_color' : 'btn-icons'}
            >
              <Save />
              <span className={!disabledSaveIcon ? 'active_color' : ''}>
                {expanded && 'Save Content'}
              </span>
            </Button>
          </span>
        )}
        <span
          className={showPrefferedTerm ? 'active_color' : ''}
          role="presentation"
          onClick={handlePrefferedTerm}
          disabled={selectedTerm === 'Edit Content'}
          data-testId="preferred-button"
        >
          <Button className="btn-icons">
            {pTIcon()}
            {expanded && (
              <span className={showPrefferedTerm ? 'active_color' : ''}>
                Preferred Terms
              </span>
            )}
          </Button>
        </span>

        <span
          role="presentation"
          disabled={selectedTerm === 'Edit Content'}
          onClick={handleLinkReference}
          data-testId="links-button"
        >
          <Button className="btn-icons">
            <LinkIcon className={showLink ? 'active' : ''} />
            {expanded && (
              <span className={showLink ? 'active_color' : ''}>
                Links & References
              </span>
            )}
          </Button>
        </span>

        <span
          role="presentation"
          disabled={selectedTerm === 'Edit Content'}
          onClick={handleClinicalTerms}
          data-testId="clinical-button"
        >
          {' '}
          <Button className="btn-icons">
            <Stethoscope className={showEnrichedContent ? 'active' : ''} />{' '}
            {expanded && (
              <span className={showEnrichedContent ? 'active_color' : ''}>
                Clinical Terms
              </span>
            )}
          </Button>
        </span>

        <fieldset>
          <span
            aria-hidden="true"
            data-testId="audit-information"
            className="eye-icon-wrapper"
          >
            <EyeShow />
            {expanded && <span className="eye-icon">Audit Information</span>}
          </span>

          {expanded && (
            <div className="auditPopover" data-testId="data">
              <div className="textContainer">
                {AUDIT_LIST.map((names) => {
                  return (
                    <Typography
                      variant="body1"
                      key={names?.title}
                      className="audit-names"
                    >
                      <b>{names?.title}</b>

                      <span>
                        {renderAuditInfo(
                          item?.audit_info[names.keyName],
                          names?.keyName,
                          item?.audit_info.total_no_review,
                        )}
                      </span>
                    </Typography>
                  );
                })}
              </div>

              <div className="textContainer">
                {auditInformation?.map((names) => {
                  return (
                    names !== 'total_no_review' && (
                      <Typography variant="body1" key={names}>
                        {item?.audit_info.names}
                      </Typography>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default ActionMenu;

ActionMenu.propTypes = {
  showedit: PropTypes.isRequired,
  onEditClick: PropTypes.isRequired,
  setShowEnrichedContent: PropTypes.isRequired,
  setShowPrefferedTerm: PropTypes.isRequired,
  showPrefferedTerm: PropTypes.isRequired,
  showEnrichedContent: PropTypes.isRequired,
  showLink: PropTypes.isRequired,
  setShowLink: PropTypes.isRequired,
  handleSaveContent: PropTypes.isRequired,
  disabledSaveIcon: PropTypes.isRequired,
  disabledPencilIcon: PropTypes.isRequired,
  item: PropTypes.isRequired,
};
