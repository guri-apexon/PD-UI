/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from 'apollo-react-icons/Bell';
import Badge from 'apollo-react/components/Badge';

import Popover from 'apollo-react/components/Popover';
import Typography from 'apollo-react/components/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from 'apollo-react/components/Tooltip';
import { navbarNotifications } from './navbarSlice';

import './Alerts.scss';
import { redaction } from '../../../AppConstant/AppConstant';
import { createFullMarkupFun, getDayLabelTextUtilsFun } from './utilsNavbar';

const replaceall = require('replaceall');

function createFullMarkup(str) {
  return createFullMarkupFun(str, replaceall, redaction);
}

function Alerts() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notificationsMenuProps = useSelector(navbarNotifications);
  if (!notificationsMenuProps.length) {
    return (
      <button
        data-testid="alert-bell-icon"
        className={`alert-icon ${!!anchorEl && 'alert-icon-active'}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={0} max={99}>
          <BellIcon />
        </Badge>
      </button>
    );
  }
  const checkForPrimary = async (data) => {
    dispatch({ type: 'READ_NOTIFICATION_SAGA', payload: data });

    // ---- Remove in local-----------
    // const axiosResp = await axios.get("/session");
    // const axiosUser = axiosResp.data;
    // const userID = axiosUser.userId.substring(1);

    // ------Uncomment in Local -------
  };

  const newNotifications = notificationsMenuProps.filter(
    (item) => item.read === false,
  );
  const getDayLabelText = (timestamp) => {
    getDayLabelTextUtilsFun(moment, timestamp);
  };
  return (
    <>
      <button
        data-testid="alert-bell-icon"
        className={`alert-icon ${!!anchorEl && 'alert-icon-active'}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={newNotifications.length} max={99}>
          <BellIcon />
        </Badge>
      </button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: '100%',
            maxWidth: 360,
            borderColor: '#e9e9e9',
            boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
            padding: 0,
          },
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
        <List
          data-testid="nav-alert-list"
          className="root"
          component="nav"
          aria-label="main mailbox folders"
        >
          {notificationsMenuProps.map((item, i) => {
            let header = null;
            if (
              i === 0 ||
              !moment(notificationsMenuProps[i - 1].timestamp).isSame(
                item.timestamp,
                'day',
              )
            ) {
              return (header = getDayLabelText(item.timestamp));
            }
            return (
              <span key={item.id}>
                {header && (
                  <ListItem className="dayLabel">
                    <Typography
                      variant="body2"
                      gutterBottom
                      className="dayLabelText"
                    >
                      {header}
                    </Typography>
                  </ListItem>
                )}

                <div
                  className={`ButtonBase-root ListItem-root 
                    ${item.read ? 'listItem' : 'listItemNotRead'}
                   ListItem-button`}
                  role="button"
                  key={`${item.id}-${item.timestamp}`}
                  onClick={() => checkForPrimary(item)}
                >
                  <div className="ListItemText-root listItemTextRoot ListItemText-multiline">
                    {item.header && item.header.length > 30 ? (
                      <Tooltip title={item.header} placement="top">
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
                        dangerouslySetInnerHTML={createFullMarkup(item.details)}
                      />
                    </Tooltip>
                  </div>

                  <p className="Typography-root timestamp Typography-body2 Typography-gutterBottom">
                    {moment(item.timestamp).format('LT')}
                  </p>

                  <span className="TouchRipple-root" />
                </div>
              </span>
            );
          })}
        </List>
      </Popover>
    </>
  );
}
export default Alerts;
