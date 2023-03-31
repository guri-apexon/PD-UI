/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BellIcon from 'apollo-react-icons/Bell';
import Badge from 'apollo-react/components/Badge';
import { useHistory } from 'react-router-dom';
import Popover from 'apollo-react/components/Popover';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import Tooltip from 'apollo-react/components/Tooltip';
import './Alerts.scss';
import { redaction } from '../../../AppConstant/AppConstant';
import TrashIcon from 'apollo-react-icons/Trash';
import IconButton from 'apollo-react/components/IconButton';
import { navbarNotifications } from './navbarSlice';
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
  const notificationsMenuPropS = useSelector(navbarNotifications);
  const history = useHistory();

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    }),
  );

  const onDelete = (event, aidocId, id, protocol) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: 'DELETE_NOTIFICATION',
      payload: { aidocId, id, protocol },
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

  const newNotifications = notificationsMenuPropS.filter(
    (item) => item.read === false,
  );
  const getDayLabelText = (timestamp) => {
    return moment().isSame(timestamp, 'day')
      ? 'Today'
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
          >
            <h4 className="Heading-main" data-testid="heading">
              Notification
            </h4>
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
                  rowCount={notificationsMenuPropS.length}
                  rowRenderer={({ key, index, style, parent }) => {
                    const notification = notificationsMenuPropS[index];
                    return (
                      <CellMeasurer
                        key={key}
                        cache={cache.current}
                        parent={parent}
                        rowIndex={index}
                        data-testId="cell-measurer"
                      >
                        <div style={style}>
                          {[notification]?.map((item, i) => {
                            let header = null;
                            if (
                              i === 0 ||
                              !moment(notification[i - 1]?.timestamp).isSame(
                                item.timestamp,
                                'day',
                              )
                            ) {
                              header = getDayLabelText(item.timestamp);
                            }
                            return (
                              <span key={item.id}>
                                <div
                                  data-testId="list-Item"
                                  className={`ButtonBase-root ListItem-root 
                    ${item.read ? 'listItem' : 'listItemNotRead'}
                   ListItem-button`}
                                  role="button"
                                  key={`${item.id}-${item.timestamp}`}
                                  onClick={() =>
                                    handleRead(
                                      item.aidocId,
                                      item.id,
                                      item.protocol,
                                    )
                                  }
                                >
                                  <div className="ListItemText-root listItemTextRoot ListItemText-multiline">
                                    {item.header && item.header.length > 30 ? (
                                      <Tooltip
                                        title={item.header}
                                        placement="top"
                                      >
                                        <span className="Typography-root ListItemText-primary listItemTextPrimary Typography-body1 Typography-displayBlock">
                                          {item.header}
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <span className="Typography-root ListItemText-primary listItemTextPrimary Typography-body1 Typography-displayBlock">
                                        {item.header}
                                      </span>
                                    )}
                                    <Tooltip
                                      title="Protocol Title"
                                      subtitle={
                                        <div
                                          dangerouslySetInnerHTML={createFullMarkup(
                                            item.details,
                                          )}
                                        />
                                      }
                                      placement="right"
                                    >
                                      <p
                                        className="Typography-root ListItemText-secondary listItemTextSecondary Typography-body2 Typography-colorTextSecondary Typography-displayBlock"
                                        dangerouslySetInnerHTML={createFullMarkup(
                                          item.details,
                                        )}
                                      />
                                    </Tooltip>
                                    <hr className="horizontal-line" />
                                  </div>

                                  <div className="IconButton-delete">
                                    <IconButton
                                      data-testId="trash-icon-1"
                                      size="small"
                                      destructiveAction
                                      onClick={(e) =>
                                        onDelete(
                                          e,
                                          item.aidocId,
                                          item.id,
                                          item.protocol,
                                        )
                                      }
                                    >
                                      <TrashIcon />
                                    </IconButton>
                                  </div>
                                  <p className="Typography-root timestamp Typography-body2 Typography-gutterBottom">
                                    {/* {moment(item.timestamp).format(' MMM D')} */}
                                    {header && <div>{header}</div>}
                                  </p>

                                  <span className="TouchRipple-root" />
                                </div>
                              </span>
                            );
                          })}
                        </div>
                      </CellMeasurer>
                    );
                  }}
                />
              )}
            </AutoSizer>
          </Popover>
        </div>
      }
    </>
  );
}
export default Alerts;
