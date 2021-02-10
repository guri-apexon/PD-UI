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
import DateRangePicker from "apollo-react/components/DateRangePickerV2";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";

import axios from "axios";
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
    // debugger;
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
  const [errorMessage, setErrorMessage] = useState("");
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
      // debugger;
      dispatch({ type: "FILTER_BY_RECENT_SAGA", payload: value });
    }
  }, [value]);
  const isFutureDate = (value) => {
    let d_now = new Date();
    let d_inp = new Date(value);
    return d_now.getTime() <= d_inp.getTime();
  };

  useEffect(() => {
    // debugger;
    if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      let date1 = dateRange[0].format("MM-DD-YYYY");
      let date2 = dateRange[1].format("MM-DD-YYYY");
      if (isFutureDate(date1) || isFutureDate(date2)) {
        // alert("Future date is restricted");
        setErrorMessage(
          "You are trying to select Future Date. Please use date range picker to select correct date range"
        );
      } else {
        setErrorMessage("");
        const range = {
          from: date1,
          to: date2,
        };
        // if (dateRange.fromDate && dateRange.toDate) {
        dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
      }
      // if (date1.isValid() && date2.isValid()) {
      // setDateRange(e.target.value);

      // }
      // } else {
      //   alert("Please select valid date range.");
      // }
    }
    // if (dateRange[0] === null && dateRange[1] === null) {
    // setErrorMessage("");
    // setDateRange([null, null]);
    // const range = {
    //   from: null,
    //   to: null,
    // };
    // dispatch({ type: "FILTER_BY_DATE_RANGE_SAGA", payload: range });
    // }
  }, [dateRange]);

  const handleChange = (e) => {
    setValue(e.target.value);
    const obj = section.sectionContent.find(
      (item) => item.value === e.target.value
    );
    // debugger
    onCheckboxClick([obj.id], identifier2);
    // debugger;
  };

  const handleRange = (e) => {
    setDateRange(e.target.value);
    // debugger;
  };

  useEffect(() => {
    // debugger;
    setValue1(listValue);
  }, [listValue]);
  useEffect(() => {
    // debugger;
    setDateRange(dateRangeValue);
  }, [dateRangeValue]);

  useEffect(() => {
    // debugger;
    if (listValue2 !== undefined) {
      const obj = section.sectionContent.find((item) => item.id === listValue2);
      // debugger
      if (obj.value) {
        setValue(obj.value);
      }
    }
  }, [listValue2]);

  const handleChange1 = (e) => {
    setValue1(parseInt(e.target.value));
    let select = parseInt(e.target.value, 10);
    onCheckboxClick([select], identifier);
    // debugger;
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
                {dateType.sectionContent.map((item, i) => (
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
            {errorMessage ? (
              <div className="errorMessage-dateRange">
                <p>{errorMessage}</p>
              </div>
            ) : null}
            <div
              style={{ marginTop: 20 }}
              data-testid="range-date-wrapper"
              id="range-date-id"
              className="range-date-wrapper"
            >
              <DateRangePicker
                value={dateRange}
                dateFormat={"DD/MMM/YYYY"}
                onChange={(value) => setDateRange(value)}
                placeholder="DD/MMM/YYYY"
                disableFuture={true}
                style={{ display: "flex", flexDirection: "column" }}
                startLabel="Start of Range"
                endLabel="End of Range"
                maxDate={new Date()}
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

const rowCount = 1000;

export class CheckboxTest extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      value: [],
    };
    this.renderRow = this.renderRow.bind(this);

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: true,
    });
  }
  static getDerivedStateFromProps(props, state) {
    // debugger;
    console.log("Props::::::::", props.listValue);
    if (
      state.list.length === 0 &&
      props.section &&
      props.section.sectionContent.length > 0
    ) {
      return {
        list: props.section.sectionContent,
      };
    }
    // if (state.value.length === 0) {
    //   return {
    //     value: props.listValue,
    //   };
    // }
    // if (props.clearAll) {
    //   return {
    //     value: [],
    //   };
    // }
    // if (props.clearAll) {
    //   props.onCheckboxClick([], props.identifier);
    //   return {
    //     value: [],
    //   };
    // }

    return null;
  }
  // componentDidMount() {
  //   axios
  //     .get("http://ca2spdml01q:8000/api/protocol_sponsor/?skip=0")
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({
  //         list: data,
  //       });
  //     });
  // }
  handleChange = (e) => {
    // setValue(e.target.value);
    // let checkedValue = parseInt(e.target.value, 10);
    // const { value } = this.state;
    // debugger;
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

    // debugger;
    // if (index > -1) {
    //   this.setState(
    //     {
    //       value: this.state.value.filter((item) => item !== selectedValue),
    //     },
    //     () => {
    //       console.log(this.state.value);
    //       this.props.onCheckboxClick(this.state.value, this.props.identifier);
    //     }
    //   );
    // } else {
    //   this.setState(
    //     {
    //       value: this.state.value.concat([selectedValue]),
    //     },
    //     () => {
    //       this.props.onCheckboxClick(this.state.value, this.props.identifier);
    //     }
    //   );
    // }

    // debugger;
  };
  // componentDidUpdate(prevProps, prevState){
  //   console.log("Prev",prevProps, prevState)
  //   console.log("current",this.props, this.state)
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.clearAll !== this.props.clearAll) {
  //     // debugger;
  //     if (this.props.clearAll) {
  //       this.setState({
  //         value: [],
  //       });
  //     }
  //   }
  // }

  renderRow({ index, key, style, parent }) {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="row">
          <div className="new-checkbox-style">
            <input
              type="checkbox"
              id={this.state.list[index].id}
              value={this.state.list[index].id}
              onChange={this.handleChange}
              checked={this.props.listValue.includes(this.state.list[index].id)}
            />
            <label htmlFor={`#${this.state.list[index].id}`}>
              {this.state.list[index].title}
            </label>
          </div>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    console.log("Loaded", this.props.listValue);
    return this.state.list.length > 0 ? (
      <div className="virtualization-set">
        <div className="list">
          {this.state.list.map((value,index) => (
            <div className="new-checkbox-style">
              <input
                type="checkbox"
                id={this.state.list[index].id}
                value={this.state.list[index].id}
                onChange={this.handleChange}
                checked={this.props.listValue.includes(
                  this.state.list[index].id
                )}
              />
              <label htmlFor={`#${this.state.list[index].id}`}>
                {this.state.list[index].title}
              </label>
            </div>
          ))}
          {/* <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  width={width}
                  height={height}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  rowCount={this.state.list.length}
                  overscanRowCount={3}
                  data={this.props.listValue}
                />
              );
            }}
          </AutoSizer> */}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
