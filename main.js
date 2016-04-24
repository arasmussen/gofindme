/**
 * This is the entry point for your experience that you will run on Exponent.
 */
'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StatusBarIOS,
  StyleSheet,
  Text,
} = React;

let Screen = require('./js/Screen');

class GoFindMe extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      position: null,
      neighborhood: null,
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          position: position,
        });
        this.getNeighborhood();
      },
      (error) => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  getNeighborhood() {
    var latitude = this.state.position.coords.latitude;
    var longitude = this.state.position.coords.longitude;

    var fetchURL = 'https://maps.googleapis.com/maps/api/geocode/json';
    fetchURL += '?latlng=' + latitude + ',' + longitude;
    fetchURL += '&key=AIzaSyDxT6NnOfiGq5zuVGLDczPVoWwhtwkNWVU';

    fetch(fetchURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      response.json().then(function(responseObject) {
        var address_components = responseObject.results[0].address_components;

        for (var i = 0; i < address_components.length; i++) {
          var address_component = address_components[i];
          if (address_component.types.indexOf('neighborhood') !== -1) {
            this.setState({
              neighborhood: address_component.long_name,
            });
            return;
          }
        }

        // no neighborhood found
        for (var i = 0; i < address_components.length; i++) {
          var address_component = address_components[i];
          if (address_component.types.indexOf('locality') !== -1) {
            this.setState({
              neighborhood: address_component.long_name,
            });
            return;
          }
        }
      }.bind(this)).catch(function(err) {
        console.error(err);
      });
    }.bind(this)).catch(function(err) {
      console.error(err);
    });
  }

  render() {
    return (
      <Screen
        title="Go Find Me"
        style={styles.container}>
        <Text style={styles.helloWorldText}>
          {this.state.neighborhood || 'loading'}
        </Text>
      </Screen>
    );
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', true);
      StatusBarIOS.setHidden(true);
    }

    this.getLocation();
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  helloWorldText: {
    color: '#ff69bf',
    fontSize: 32,
    marginTop: 20,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('main', () => GoFindMe);
