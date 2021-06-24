import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import BellIcon from "apollo-react-icons/Bell";
import Badge from "apollo-react/components/Badge";

import Popover from "apollo-react/components/Popover";
import Typography from "apollo-react/components/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "apollo-react/components/Tooltip";
import { userId } from "../../../store/userDetails";
import { BASE_URL_8000 } from "../../../utils/api";

import "./Alerts.scss";

function Alerts({ list }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const uid = useSelector(userId);

  const checkForPrimary = async (data) => {
    // debugger;
    const postObj = {
      id: data.id,
      protocol: data.protocol,
      aidocId: data.aidocId,
      readFlag: true,
    };
    const notificationUrl = `${BASE_URL_8000}/api/notification_read/`;
    try {
      const readResp = await axios.post(notificationUrl, postObj);
      if (readResp) {
        const userID = uid.substring(1);
        const userresp = await axios.get(
          `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userID}&protocol=${data.protocolNumber}`
        );
        if (userresp && userresp.data) {
          dispatch({ type: "GET_NOTIFICATION_SAGA", payload: userID });
          history.push(`/protocols?protocolId=${data.aidocId}&tab=2`);
        } else {
          toast.warn(
            "You are not an approved primary user of this protocol. Access to details denied"
          );
        }
      } else {
      }
    } catch (err) {}
    // dispatch({ type: "SET_NOTIFICATION_READ_SAGA", payload: postObj });

    //---- Remove in local-----------
    // const axiosResp = await axios.get("/session");
    // const axiosUser = axiosResp.data;
    // const userID = axiosUser.userId.substring(1);

    //------Uncomment in Local -------
  };

  const newNotifications = list.filter((item) => item.read === false);
  const getDayLabelText = (timestamp) => {
    return moment().isSame(timestamp, "day")
      ? "Today"
      : moment().subtract(1, "day").isSame(timestamp, "day")
      ? "Yesterday"
      : moment(timestamp).format("ddd MMM D");
  };
  return (
    <>
      <button
        data-testid="alert-bell-icon"
        className={`alert-icon ${!!anchorEl && "alert-icon-active"}`}
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
            width: "100%",
            maxWidth: 360,
            borderColor: "#e9e9e9",
            boxShadow: "0 8px 20px 0 rgba(0, 0, 0, 0.08)",
            padding: 0,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List
          data-testid="nav-alert-list"
          className={"root"}
          component="nav"
          aria-label="main mailbox folders"
        >
          {list.map((item, i) => {
            let header = null;
            if (
              i === 0 ||
              !moment(list[i - 1].timestamp).isSame(item.timestamp, "day")
            ) {
              header = getDayLabelText(item.timestamp);
            }
            return (
              <span key={item.id}>
                {header && (
                  <ListItem className={"dayLabel"}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      className={"dayLabelText"}
                    >
                      {header}
                    </Typography>
                  </ListItem>
                )}

                <div
                  className={`ButtonBase-root ListItem-root 
                    ${item.read ? "listItem" : "listItemNotRead"}
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
                    <Tooltip title={item.details} placement="right">
                      <p className="Typography-root ListItemText-secondary listItemTextSecondary Typography-body2 Typography-colorTextSecondary Typography-displayBlock">
                        {item.details}
                      </p>
                    </Tooltip>
                  </div>

                  <p className="Typography-root timestamp Typography-body2 Typography-gutterBottom">
                    {moment(item.timestamp).format("LT")}
                  </p>

                  <span className="TouchRipple-root"></span>
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
