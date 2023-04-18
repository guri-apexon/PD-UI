import PropTypes from 'prop-types';
import Popover from 'apollo-react/components/Popover';
import Typography from 'apollo-react/components/Typography';

function AuditLog({ openAudit, setOpenAudit, AUDIT_LIST, item }) {
  return (
    <Popover
      open={!!openAudit}
      anchorEl={openAudit}
      onClose={() => setOpenAudit(null)}
    >
      <div className="auditPopover">
        <div className="textContainer" data-testId="openaudit">
          {AUDIT_LIST.map((names) => {
            return (
              <Typography variant="body1" key={names?.title}>
                {names?.title}&nbsp;:&nbsp;
                {item?.audit_info[names.keyName] || '-----'}
              </Typography>
            );
          })}
        </div>
        <div className="textContainer">
          {Object.keys(item?.audit_info).map((names) => {
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
    </Popover>
  );
}

export default AuditLog;

AuditLog.propTypes = {
  openAudit: PropTypes.isRequired,
  setOpenAudit: PropTypes.isRequired,
  AUDIT_LIST: PropTypes.isRequired,
  item: PropTypes.isRequired,
};
