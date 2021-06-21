import React from "react";

import { withRouter } from "react-router-dom";

import Button from "apollo-react/components/Button";
import Search from "apollo-react/components/Search";
import MenuButton from "apollo-react/components/MenuButton";

class ProtocolSearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderChip: false,
      input: "",
      search: "",
      filters: [],
    };
  }

  handleSaveSearchProtocol = (e) => {
    // let newArr = this.state.filters.concat("input")
    this.setState({ input: e.target.value, search: e.target.value });
  };

  handleDeleteChip = (e) => {
    this.state["search"] = "";
  };

  handleSearchProtocol = (e) => {
    // debugger
    e.preventDefault();
    // this.props.getSearchInput(this.state.input);
    this.props.handleKeywordSearch(this.state.input);
    this.props.saveRecentSearch(this.state.input);
    // this.props.history.push(`/search?key=${this.state.input}`);
    this.setState({ input: "" });
    // ReactDOM.render(
    // <Chip
    //   color="white"
    //   label={this.state["input"]}
    //   value={this.state["search"]}
    //   onDelete={(e) => this.handleDeleteChip(e)}
    //   size={"small"}
    // />,
    //   document.getElementById("chip")
    // );
  };

  render() {
    const handleClick = (label) => () => {
      if (label === "Compare") {
        this.props.compareProtocol();
      } else {
        this.props.saveSearch();
      }
    };

    const menuItems = [
      // {
      //   text: "Compare",
      //   onClick: handleClick("Compare"),
      // },
      {
        text: "Save Search",
        onClick: handleClick("Save"),
      },
    ];

    return (
      <div className="width100">
        <form onSubmit={this.handleSearchProtocol} style={{ float: "left" }}>
          <Search
            id="txtSearchProtocol"
            style={{ width: "500px" }}
            placeholder="Enter additional Search Terms if Applicable"
            size="small"
            onChange={this.handleSaveSearchProtocol}
            value={this.state.input}
            data-testid="key-search-input"
          />
          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal">
            <Button
              variant="primary"
              size="small"
              style={{ marginLeft: 10, top: 5, width: 80 }}
              onClick={this.handleSearchProtocol}
              data-testid="search-button"
            >
              Search
            </Button>
          </div>
        </form>
        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal floatRight">
          {this.props.idPresent && (
            <MenuButton
              buttonText="Select Action"
              menuItems={menuItems}
              size="small"
              style={{ top: 8 }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ProtocolSearchButton);
