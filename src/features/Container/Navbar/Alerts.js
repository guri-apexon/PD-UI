import React from "react";
import moment from "moment";
import BellIcon from "apollo-react-icons/Bell";
import Badge from "apollo-react/components/Badge";

import Popover from "apollo-react/components/Popover";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "apollo-react/components/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    paddingBottom: 0,
  },
  listItem: {
    height: 72,
    outline: "none",
    paddingLeft: 14,
    paddingRight: 24,
    color: "#444444",
  },
  listItemTextRoot: {
    paddingLeft: 0,
    whiteSpace: "nowrap",
  },
  listItemTextPrimary: {
    fontSize: 16,
    fontWeight: 600,
    color: "inherit",
  },
  listItemTextSecondary: {
    width: 310,
    fontSize: 14,
    color: "inherit",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.71,
  },
  listItemNotRead: {
    height: 72,
    outline: "none",
    paddingLeft: 14,
    paddingRight: 24,
    backgroundColor: "#0076ae",
    color: "#000000",
    "& p": {
      color: "#000000",
    },
    "& svg": {
      color: "#000000",
    },
  },
  timestamp: {
    color: "#595959",
    bottom: 8,
    position: "relative",
    whiteSpace: "nowrap",
    lineHeight: 1.71,
    // IE11-specific selector
    "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
      right: 48,
    },
  },
  icon: {
    color: "#0557d5",
    minWidth: 0,
    marginRight: 16,
  },
  iconSize: {
    fontSize: 19.22,
    padding: 0.4,
    boxSizing: "content-box",
  },
  dayLabel: {
    backgroundColor: "#f8f9fb",
    height: 32,
    outline: "none",
  },
  dayLabelText: {
    fontWeight: 600,
  },
}));

function Alerts({ list }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const newNotifications = list.filter((item) => item.read === false);
  const getDayLabelText = (timestamp) => {
    return moment().isSame(timestamp, "day")
      ? "Today"
      : moment().subtract(1, "day").isSame(timestamp, "day")
      ? "Yesterday"
      : moment(timestamp).format("ddd MMM D");
  };
  //   console.log("newNotifications", newNotifications.length);
  return (
    <>
      <button
        className="alert-icon"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={newNotifications.length} max={99}>
          <BellIcon fontSize="small" />
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
          className={classes.root}
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
            // console.log(header);
            return (
              <>
                {header && (
                  <ListItem className={classes.dayLabel} key={i}>
                    <p
                      variant="body2"
                      gutterBottom
                      className={classes.dayLabelText}
                    >
                      {header}
                    </p>
                  </ListItem>
                )}
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  className={
                    item.read ? classes.listItem : classes.listItemNotRead
                  }
                  key={i + 1}
                >
                  <Tooltip title={item.details} aria-label="add">
                    <ListItemText
                      primary={item.header}
                      secondary={item.details}
                      classes={{
                        root: classes.listItemTextRoot,
                        primary: classes.listItemTextPrimary,
                        secondary: classes.listItemTextSecondary,
                      }}
                    />
                  </Tooltip>
                  <p variant="body2" gutterBottom className={classes.timestamp}>
                    {moment(item.timestamp).format("LT")}
                  </p>
                </ListItem>
              </>
            );
          })}
        </List>
      </Popover>
    </>
  );
}
export default Alerts;
