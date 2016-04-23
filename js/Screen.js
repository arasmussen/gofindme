'use strict';

let React = require('react-native');
let {
  ScrollView,
  StyleSheet,
  View,
} = React;

const STATUS_BAR_HEIGHT = 20;

class Screen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    let {
      title,
      ...props,
    } = this.props;

    return (
      <View {...props}>
        <ScrollView
          ref={component => { this._scrollView = component; }}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 0,
  },
});

module.exports = Screen;
