import React from 'react';

import { withRouter } from 'react-router-dom';

import Button from 'apollo-react/components/Button';
import Search from 'apollo-react/components/Search';
// import MenuButton from "apollo-react/components/MenuButton";

class ProtocolSearchButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleSaveSearchProtocol = (e) => {
    // let newArr = this.state.filters.concat("input")
    this.setState({ input: e.target.value });
  };

  handleSearchProtocol = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    this.props.handleKeywordSearch(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <div className="width100">
        <form onSubmit={this.handleSearchProtocol} style={{ float: 'left' }}>
          <Search
            id="txtSearchProtocol"
            style={{ width: '500px' }}
            placeholder="Enter additional Search Terms if Applicable"
            size="small"
            onChange={this.handleSaveSearchProtocol}
            value={input}
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
      </div>
    );
  }
}

export default withRouter(ProtocolSearchButton);
