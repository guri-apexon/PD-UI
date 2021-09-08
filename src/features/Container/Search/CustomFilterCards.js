import { makeStyles } from "@material-ui/core/styles";
import { neutral7 } from "apollo-react/colors";
import Card from "apollo-react/components/Card";
import CardContent from "apollo-react/components/CardContent";
import Typography from "apollo-react/components/Typography";
import CheckboxGroup from "apollo-react/components/CheckboxGroup";
import Checkbox from "apollo-react/components/Checkbox";

import Radio from "apollo-react/components/Radio";
import RadioGroup from "apollo-react/components/RadioGroup";
import DateRangePicker from "apollo-react/components/DateRangePickerV2";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CellMeasurerCache } from "react-virtualized";
import { FixedSizeList as List } from "react-window";

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

export const CheckboxCard = ({
  section,
  index,
  identifier,
  onCheckboxClick,
  listValue,
}) => {
  const [value, setValue] = React.useState([]);

  useEffect(() => {
    setValue(listValue);
  }, [listValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
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
                  data-testid={content.value}
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

export const DateRangeCard = ({
  section,
  dateType,
  identifier,
  onCheckboxClick,
  listValue,
  listValue2,
  identifier2,
  dateRangeValue,
}) => {
  const [value, setValue] = React.useState("0");
  const [value1, setValue1] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  // const [dateRange, setDateRange] = React.useState({
  //   fromDate: "",
  //   toDate: "",
  // });
  const [dateRange, setDateRange] = React.useState(dateRangeValue);
  const dispatch = useDispatch();

  useEffect(() => {
    // setValue(listValue)
    if (value) {
      // props.history.push(`/search?${resultQuery}`);
      dispatch({ type: "FILTER_BY_RECENT_SAGA", payload: value });
    }
  }, [value, dispatch]);

  useEffect(() => {
    let date1, date2;
    if (dateRange[0] && dateRange[0] !== undefined) {
      date1 = dateRange[0].format("MM-DD-YYYY");
    }
    if (dateRange[1] && dateRange[1] !== undefined) {
      date2 = dateRange[1].format("MM-DD-YYYY");
    }
    const range = {
      from: date1 || null,
      to: date2 || null,
    };
    dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
  }, [dateRange, dispatch]);

  const handleChange = (e) => {
    setValue(e.target.value);
    const obj = section.sectionContent.find(
      (item) => item.value === e.target.value
    );
    const selectedRange = parseInt(obj.id, 10);
    if (selectedRange === 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setDateRange([null, null]);
      const range = {
        from: null,
        to: null,
      };
      dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
    }
    onCheckboxClick([obj.id], identifier2);
  };

  useEffect(() => {
    setValue1(listValue);
  }, [listValue]);
  useEffect(() => {
    setDateRange(dateRangeValue);
  }, [dateRangeValue]);

  useEffect(() => {
    if (listValue2 !== undefined) {
      const obj = section.sectionContent.find((item) => item.id === listValue2);
      if (obj.value) {
        setValue(obj.value);
        if (obj.value === "0") {
          setDisabled(false);
        }
      }
    }
  }, [listValue2, section.sectionContent]);

  const handleChange1 = (e) => {
    setValue1(parseInt(e.target.value));
    let select = parseInt(e.target.value, 10);
    onCheckboxClick([select], identifier);
  };

  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div
            style={{ marginTop: 10 }}
            data-testid="recent-date-wrapper"
            id="recent-date-id"
          >
            <div
              style={{
                marginTop: 5,
                paddingBottom: 5,
                marginBottom: 5,
                borderBottom: "1px solid #d0d0d0",
              }}
            >
              <RadioGroup value={value1} onChange={handleChange1}>
                {dateType &&
                  dateType.sectionContent &&
                  dateType.sectionContent.map((item, i) => (
                    <Radio
                      id={item.id}
                      key={item.id}
                      value={item.id}
                      label={item.title}
                      size="small"
                    />
                  ))}
              </RadioGroup>
              {/* <CheckboxGroup value={value1} onChange={handleChange1}>
                {dateType.sectionContent.map((content, i) => (
                  <Checkbox
                    id={content.id}
                    key={i}
                    value={content.id}
                    label={content.title}
                    size="small"
                    // onChange= {(e)=> onCheckBoxClick(e)}
                    // checked='true'
                    // checked={value && value.includes(content.id)}
                  />
                ))}
              </CheckboxGroup> */}
            </div>

            <RadioGroup value={value} onChange={(e) => handleChange(e)}>
              {section.sectionContent.map((item, i) => (
                <Radio
                  id={item.id}
                  key={item.id}
                  value={item.value}
                  label={item.title}
                  size="small"
                />
              ))}
            </RadioGroup>
            {/* {errorMessage ? (
              <div className="errorMessage-dateRange">
                <p>{errorMessage}</p>
              </div>
            ) : null} */}
            <div
              style={{ marginTop: 20 }}
              data-testid="range-date-wrapper"
              id="range-date-id"
              className="range-date-wrapper"
            >
              <DateRangePicker
                value={dateRange}
                dateFormat={"DD-MMM-YYYY"}
                onChange={(value) => setDateRange(value)}
                placeholder="DD-MMM-YYYY"
                disableFuture={true}
                style={{ display: "flex", flexDirection: "column" }}
                startLabel="Start of Range"
                endLabel="End of Range"
                maxDate={new Date()}
                error={false}
                disabled={disabled}
                // helperText="Please select event date"
              />
              {/* <DateRangePicker
                disableFuture={true}
                maxDate={new Date()}
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
                value={dateRange}
              /> */}
            </div>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
const ListStyle = {
  position: "relative",
  width: "99%",
  overflowX: "hidden",
};

export class CheckboxTest extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      value: [],
    };

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: true,
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (
      state.list.length === 0 &&
      props.section &&
      props.section.sectionContent.length > 0
    ) {
      return {
        list: props.section.sectionContent,
      };
    }
    return null;
  }
  handleChange = (e) => {
    let selectedArr = this.props.listValue;
    const selectedValue = parseInt(e.target.value, 10);

    const index = selectedArr.indexOf(selectedValue);

    if (index > -1) {
      selectedArr.splice(index, 1);
      this.props.onCheckboxClick(selectedArr, this.props.identifier);
    } else {
      selectedArr.push(selectedValue);
      this.props.onCheckboxClick(selectedArr, this.props.identifier);
    }
  };

  render() {
    return this.state.list.length > 0 ? (
      <div className="virtualization-set">
        <div className="list">
          <List
            className="List"
            style={ListStyle} // adding styles
            itemData={this.state.list} // adding your own data
            height={300}
            itemCount={this.state.list.length}
            itemSize={35}
          >
            {({ index, style, data }) => {
              return (
                <div
                  className="new-checkbox-style"
                  key={data[index].id}
                  style={style}
                >
                  <input
                    type="checkbox"
                    id={data[index].id}
                    value={data[index].id}
                    onChange={this.handleChange}
                    checked={
                      this.props.listValue &&
                      this.props.listValue.includes(data[index].id)
                    }
                  />
                  <label htmlFor={`#${data[index].id}`}>
                    {data[index].title}
                  </label>
                </div>
              );
            }}
          </List>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
