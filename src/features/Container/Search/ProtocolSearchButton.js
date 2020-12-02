import React from "react";
import ReactDOM from "react-dom";

import Button from "apollo-react/components/Button";
import Search from "apollo-react/components/Search";
import Chip from "apollo-react/components/Chip";
import MenuButton from "apollo-react/components/MenuButton";

export default class ProtocolSearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      search: "",
      removeChip() {
        this.setState("");
      },
    };
  }

  handleSaveSearchProtocol = (e) => {
    this.setState({ input: e.target.value, search: e.target.value });
  };

  handleDeleteChip = (e) => {
    this.state["search"] = "";
  };

  handleSearchProtocol = (e) => {
    ReactDOM.render(
      <Chip
        color="secondary"
        label={this.state["input"]}
        value={this.state["search"]}
        onDelete={(e) => this.handleDeleteChip(e)}
        size={"small"}
      />,
      document.getElementById("chip")
    );
  };

  render() {
    const handleClick = (label) => () => {
      console.log(`You picked ${label}.`);
    };

    const menuItems = [
      {
        text: "Option 1",
        onClick: handleClick("Option 1"),
      },
      {
        text: "Option 2",
        onClick: handleClick("Option 2"),
      },
    ];

    return (
      <div className="width98">
        <Search
          id="txtSearchProtocol"
          style={{ width: "500px" }}
          placeholder="Enter additional Search Terms if Applicable"
          size="small"
          onChange={this.handleSaveSearchProtocol}
        />
        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal">
          <Button
            variant="primary"
            size="small"
            style={{ marginLeft: 10, top: 5, width: 80 }}
            onClick={this.handleSearchProtocol}
          >
            Search
          </Button>
        </div>
        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal floatRight">
          <MenuButton
            buttonText="Select Action"
            menuItems={menuItems}
            size="small"
            style={{ top: 8 }}
          />
        </div>
      </div>
    );
  }
}
