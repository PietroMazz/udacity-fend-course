import React, {Component} from 'react';

class Search extends Component {

    render() {
      return(
        <div className="searchbar">
          <div className="input-wrapper">
            <input
              id="queryInput"
              type="text"
              value={this.props.query}
              onChange={(event) => this.props.updateQuery(event.target.value)}
              placeholder="Search location"
              />
          </div>
        </div>
      )
    }
}

export default Search;
