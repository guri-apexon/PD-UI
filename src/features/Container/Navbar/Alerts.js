/* eslint-disable */
import BellIcon from 'apollo-react-icons/Bell';
import TrashIcon from 'apollo-react-icons/Trash';
import Badge from 'apollo-react/components/Badge';
import IconButton from 'apollo-react/components/IconButton';
import Popover from 'apollo-react/components/Popover';
import Tag from 'apollo-react/components/Tag';
import Tooltip from 'apollo-react/components/Tooltip';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';
import { redaction } from '../../../AppConstant/AppConstant';
import './Alerts.scss';
import { navbarNotifications } from './navbarSlice';
import notificationValues from './constant';
const replaceall = require('replaceall');

const notificationStyle = {
  width: '100%',
  maxWidth: 360,
  borderColor: '#e9e9e9',
  boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
  padding: 0,
  height: '400px',
  overflow: 'visible !important',
};

function createFullMarkup(str) {
  if (str) {
    return {
      __html: replaceall(
        redaction.text,
        `<span class="blur">${redaction.text}</span>`,
        str,
      ),
    };
  }
  return {
    __html: str,
  };
}

function Alerts() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const notificationData = useSelector(navbarNotifications);
  const history = useHistory();

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  const onDelete = (event, aidocId, id, protocol, alert_id) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: 'DELETE_NOTIFICATION',
      payload: { aidocId, id, protocol, alert_id },
    });
  };

  const handleRead = (aidocId, id, protocol) => {
    dispatch({
      type: 'READ_NOTIFICATION',
      payload: { aidocId, id, protocol },
    });
    history.push(`/protocols?protocolId=${aidocId}&tab=1`);
    setAnchorEl(!anchorEl);
  };

  const newNotifications = notificationData.filter(
    (item) => item.read === false,
  );

  const getDayLabelText = (timestamp) => {
    return moment().isSame(timestamp, 'day')
      ? moment(timestamp).local().format('HH:mm A')
      : moment().subtract(1, 'day').isSame(timestamp, 'day')
      ? 'Yesterday'
      : moment(timestamp).format(' MMM D');
  };

  const openNotifications = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <button
        data-testid="alert-bell-icon"
        className={`alert-icon ${!!anchorEl && 'alert-icon-active'}`}
        onClick={openNotifications}
      >
        <Badge badgeContent={newNotifications.length || 0} max={99}>
          <BellIcon />
        </Badge>
      </button>
      {
        <div data-testid="showPopover">
          {' '}
          <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            data-testId="popover"
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              style: notificationStyle,
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            className="pop-over"
          >
            <h4 className="Heading-main" data-testid="heading">
              Notification
            </h4>
            {notificationData?.length > 0 ? (
              <AutoSizer data-testId="list-item">
                {({
                  width,
                  maxWidth,
                  borderColor,
                  boxShadow,
                  padding,
                  height,
                  overflow,
                }) => (
                  <List
                    data-testId="list-item-2"
                    width={width}
                    maxWidth={maxWidth}
                    borderColor={borderColor}
                    boxShadow={boxShadow}
                    padding={padding}
                    height={height}
                    overflow={overflow}
                    rowHeight={cache.current.rowHeight}
                    deferredMeasurementCache={cache.current}
                    rowCount={notificationData.length}
                    rowRenderer={({ key, index, style, parent }) => {
                      const notification = notificationData[index];
                      let header = null;
                      if (
                        index === 0 ||
                        !moment(notificationData[index - 1]?.timestamp).isSame(
                          notification.timestamp,
                          'day',
                        )
                      ) {
                        header = getDayLabelText(notification.timestamp);
                      }
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          rowIndex={index}
                          data-testId="cell-measurer"
                        >
                          {
                            <div style={style}>
                              <div
                                data-testId="list-Item"
                                className={`ButtonBase-root notification-item
                    ${notification.read ? 'listItem' : 'listItemNotRead'}
                   ListItem-button`}
                                role="button"
                                key={`${notification.id}-${notification.timestamp}`}
                                onClick={() =>
                                  handleRead(
                                    notification.aidocId,
                                    notification.id,
                                    notification.protocol,
                                  )
                                }
                              >
                                <div className="notification-content">
                                  {notification.header &&
                                  notification.header.length > 30 ? (
                                    <Tooltip
                                      title={notification.header}
                                      placement="top"
                                    >
                                      <span className="listItemTextPrimary">
                                        {notification.header}
                                      </span>
                                    </Tooltip>
                                  ) : (
                                    <span className="listItemTextPrimary">
                                      {'Protocol Number: ' +
                                        notification.header}
                                    </span>
                                  )}
                                  <span className="listItemTextSecondary">
                                    {'Status: ' + notification.status}
                                  </span>
                                  {!isEqual(
                                    notificationValues[notification.event],
                                    'Edited',
                                  ) ? (
                                    <Tag
                                      label={
                                        notificationValues[notification.event]
                                      }
                                      variant="primary"
                                    />
                                  ) : (
                                    <span>
                                      {
                                        'Your protocol has had some changes made'
                                      }
                                    </span>
                                  )}
                                </div>

                                <div className="IconButton-delete">
                                  <IconButton
                                    data-testId="trash-icon-1"
                                    size="small"
                                    destructiveAction
                                    onClick={(e) =>
                                      onDelete(
                                        e,
                                        notification.aidocId,
                                        notification.id,
                                        notification.protocol,
                                        notification.alert_id,
                                      )
                                    }
                                  >
                                    <TrashIcon />
                                  </IconButton>
                                </div>
                                <p className="timestamp">
                                  {notification.timeUpdated && (
                                    <div>
                                      {getDayLabelText(
                                        notification.timeUpdated,
                                      )}
                                    </div>
                                  )}
                                </p>
                              </div>
                            </div>
                          }
                        </CellMeasurer>
                      );
                    }}
                  />
                )}
              </AutoSizer>
            ) : (
              <h4 className="error-message">No New Notifications</h4>
            )}
          </Popover>
        </div>
      }
    </>
  );
}
export default Alerts;
