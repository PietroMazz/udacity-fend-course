import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'

class LocationsList extends Component {

    locationsFilter = () => {
      // Array of the locations to be shown on the map: the locations are filtered
      // on the basis of the query props
      var locations;
      if (this.props.query) {
        const match = new RegExp(escapeRegExp(this.props.query), 'i');
        locations = this.props.locations.filter((element) => match.test(element.title));
      } else {
        locations = this.props.locations;
      }
      return locations;
    }


    render() {
      return(
        <ul className="locations-list">
          {this.locationsFilter().map(location =>
          (<li key={location.titlenpm }>{location.title}</li>))}
        </ul>
      )
    }
}

export default LocationsList;
