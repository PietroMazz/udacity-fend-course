import React, {Component} from 'react';
import escapeRegExp from 'escape-string-regexp'
const google = window.google;

class Map extends Component {
  initMap() {
    //Create a variable for the map
    var map;

    // Create a new blank array for all the listing markers.
    var markers = [];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 41.898707,
        lng: 12.476873
      },
      zoom: 15
    });
    var locations;

    // Array of the locations to be shown on the map: the locations are filtered
    // on the basis of the query props
    if (this.props.query) {
      const match = new RegExp(escapeRegExp(this.props.query), 'i');
      locations = this.props.locations.filter((element) => match.test(element.title));
    } else {
      locations = this.props.locations;
    }

    if(locations.length > 0) {

    var largeInfowindow = new google.maps.InfoWindow({maxWidth: 100});
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
        // The Icon color is changed when the infoWindow is opened
        markers.forEach(element => element.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png"))
        this.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
      });
      bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
  }

    function  populateInfoWindow(marker, infowindow) {
        // Firstly I try to get the necessary data for the infoWindows using Wikipedia API
        var remoteUrlWithOrigin = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&explaintext=true&exsentences=1&titles=" + encodeURIComponent(marker.title).replace(/[!'()*]/g, escape);
        return fetch(remoteUrlWithOrigin, {
          method: 'GET',
          headers: new Headers({
            'Api-User-Agent': 'VisitRomeInThreeDays'
          })
          // Other init settings such as 'credentials'
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok: ' + response.statusText);
        }).then((data) => {
          // Check to make sure the infowindow is not already opened on this marker.
          if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div> <strong>' + marker.title + '</strong>' +
              '<p>' + data.query.pages[Object.keys(data.query.pages)[0]].extract + '</p></div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
              infowindow.setMarker = null;
              marker.setIcon("http://maps.google.com/mapfiles/ms/icons/red-dot.png");
            });
          }
        })
      }
  }

  componentDidMount() {
    this.initMap();
  }
  componentDidUpdate() {
    this.initMap();
  }

  render() {
    return (
      <div className="map-wrapper">
        <div id="map"></div>
      </div>
    )
  }
}

export default Map;
