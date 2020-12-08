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

import React from "react";

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

export const CheckboxCard = ({ state, section, index }) => {
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
          <div>
            <CheckboxGroup value={state["searchValue"]} onChange={handleChange}>
              {section.sectionContent.map((content, i) => (
                <Checkbox
                  id={section.sectionContent[i].id + "_" + i}
                  key={i}
                  value={section.sectionContent[i].id + "_" + i}
                  label={content.title}
                  size="small"
                />
              ))}
            </CheckboxGroup>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};

export const TextCard = ({ state, section, index }) => {
  const [value, setValue] = React.useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
    state["searchValue"] = e.target.value;
  };

  const classes = useStyles();
  return (
    <Card
      color="dark"
      className={classNames(classes.card, index === 0 && classes.cardHighlight)}
    >
      <CardContent>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div>
            {section.sectionContent.map((content, i) => (
              <p className="text-filter" key={content.id}>
                {content.title}
              </p>
            ))}
          </div>
        </Typography>
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
      color="dark"
      className={classNames(classes.card, index === 0 && classes.cardHighlight)}
    >
      <CardContent>
        <Typography className={classes.cardSubtitle} variant="caption">
          <div>
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
