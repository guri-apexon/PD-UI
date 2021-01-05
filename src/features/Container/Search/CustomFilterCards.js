import { makeStyles } from "@material-ui/core/styles";
import { neutral7 } from "apollo-react/colors";
import classNames from "classnames";

import Card from "apollo-react/components/Card";
import CardContent from "apollo-react/components/CardContent";
import Typography from "apollo-react/components/Typography";
import CheckboxGroup from "apollo-react/components/CheckboxGroup";
import Checkbox from "apollo-react/components/Checkbox";

import Radio from "apollo-react/components/Radio";
import RadioGroup from "apollo-react/components/RadioGroup";
import DateRangePicker from "apollo-react/components/DateRangePicker";

import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles({
  root: {
    display: "flex",
    height: 400,
    boxSizing: "content-box",
  },
  panelTitle: {
    padding: "24px 24px 16px 24px",
    fontWeight: 600,
  },
  card: {
    // margin: '8px 24px',
    cursor: "pointer",
  },
  cardHighlight: {
    backgroundColor: "#FFFFFF",
  },
  // cardContainer:{
  //   padding:'0 !important'
  // },
  bold: {
    fontWeight: 600,
  },
  cardSubtitle: {
    color: neutral7,
    lineHeight: "24px",
  },
  page: {
    padding: 24,
  },
  panelContent: {
    overflow: "auto",
    height: 333,
    minWidth: 300,
  },
  navLogo: {
    color: "white",
    lineHeight: "56px",
    marginRight: 24,
    cursor: "pointer",
    zIndex: 2,
    whiteSpace: "nowrap",
  },
  nav: {
    overflow: "hidden",
  },
});

export const TableOfContent = ({ section }) => {
  return (
    <Card>
      <CardContent>
        <div>
          <div style={{ marginTop: 10 }}>
            {section.sectionContent.map((content, i) => (
              <p className="text-filter" key={content.id}>
                {content.title}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CheckboxCard = ({ section, index, identifier, onCheckboxClick, listValue }) => {
  const [value, setValue] = React.useState([]);

  useEffect(() => {
    setValue(listValue)
    // console.log('listValue :', listValue);
  }, [listValue])

  const handleChange = (e) => {
    setValue(e.target.value);
    // console.log("aaaa", e.target.value);
    onCheckboxClick(e.target.value, identifier);
  };

  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.cardContainer}>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div style={{ marginTop: 10 }}>
            <CheckboxGroup value={value} onChange={handleChange}>
              {section.sectionContent.map((content, i) => (
                <Checkbox
                  id={section.sectionContent[i].id + "_" + i}
                  key={i}
                  value={section.sectionContent[i].id}
                  label={content.title}
                  size="small"
                  // onChange= {(e)=> onCheckBoxClick(e)}
                  // checked='true'
                  // checked={value && value.includes(content.id)}
                />
              ))}
            </CheckboxGroup>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export const TextCard = ({ section }) => {
  const [value, setValue] = React.useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <div className={classes.cardSubtitle}>
          <div style={{ marginTop: 10 }}>
            {section.sectionContent.map((content, i) => (
              <p
                className="text-filter"
                key={content.id}
                style={{ fontSize: 13 }}
              >
                {content.title}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const RadioCard = ({ state, section, index }) => {
  const [value, setValue] = React.useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
    state["searchValue"] = e.target.value;
  };

  const classes = useStyles();
  return (
    <Card
      className={classNames(classes.card, index === 0 && classes.cardHighlight)}
    >
      <CardContent>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div style={{ marginTop: 10 }}>
            <RadioGroup value={state["searchValue"]} onChange={handleChange}>
              {section.sectionContent.map((content, i) => (
                <Radio
                  id={section.sectionContent[i].id + "_" + i}
                  key={i}
                  value={section.sectionContent[i].id + "_" + i}
                  label={content.title}
                  size="small"
                />
              ))}
            </RadioGroup>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export const DateRangeCard = ({ section }) => {
  const [value, setValue] = React.useState("");
  const [dateRange, setDateRange] = React.useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // setValue(listValue)
    // console.log('listValue :', listValue);
    if (value) {
      // props.history.push(`/search?${resultQuery}`);
      dispatch({ type: "FILTER_BY_RECENT_SAGA", payload: value });
    }
  }, [value])

  useEffect(() => {
    const range = {
      from: dateRange.fromDate,
      to: dateRange.toDate
    }
    console.log('before ----',range)
    if(dateRange.fromDate && dateRange.toDate) {
      console.log('dispacth ----',range)
      dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
    }
   
  }, [dateRange])

  const handleChange = (e) => {
    console.log(e.target.value);
    
    setValue(e.target.value);
  };

  const handleRange = (e) => {
    console.log(e.target.value)
    setDateRange(e.target.value)
  }

  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div style={{ marginTop: 10 }}>
            <RadioGroup value={value} onChange={(e) => handleChange(e)}>
              {section.sectionContent.map((item, i) => (
                <Radio
                  id={item.id}
                  key={item.id}
                  value={item.content}
                  label={item.title}
                  size="small"
                />
              ))}
            </RadioGroup>
            <div style={{ marginTop: 20 }}>
              <DateRangePicker
                onChange={(e) => handleRange(e)}
                fromDateProps={{
                  label: "Start of Range",
                  placeholder: "MM/DD/YYYY",
                }}
                toDateProps={{
                  label: "End of Range",
                  placeholder: "MM/DD/YYYY",
                }}
                fromLabel="hhhhh"
              />
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
