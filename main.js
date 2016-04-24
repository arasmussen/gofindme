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
      neighborhood: null,
    };
  }

  getNeighborhood() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=37.762219,-122.415614&key=AIzaSyDxT6NnOfiGq5zuVGLDczPVoWwhtwkNWVU', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      response.json().then(function(responseObject) {
        for (var i = 0; i < responseObject.results[0].address_components.length; i++) {
          var address_component = responseObject.results[0].address_components[i];
          if (address_component.types.indexOf('neighborhood') !== -1) {
            this.setState({
              neighborhood: address_component.long_name,
            });
            break;
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
    this.getNeighborhood();
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
