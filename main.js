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
    };
  }

  render() {
    return (
      <Screen
        title="Go Find Me"
        style={styles.container}>
        <Text style={styles.helloWorldText}>
          Sup Viewers!
        </Text>
      </Screen>
    );
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', true);
      StatusBarIOS.setHidden(true);
    }
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
