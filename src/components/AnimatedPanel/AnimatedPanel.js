import React, { Component } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './AnimatedPanelStyles';

export default class AnimatedPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      animation: new Animated.Value(0)
    };
  }

  toggle = () => {
    const { expanded, minHeight, maxHeight } = this.state;
    const initialValue = this.state.expanded ? maxHeight + minHeight : minHeight;
    const finalValue = this.state.expanded ? minHeight : maxHeight + minHeight;
    this.setState({ expanded: !expanded });
    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
      speed: 20
    }).start();
  };

  _setMaxHeight = event => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  _setMinHeight = event => {
    this.state.animation._value === 0 &&
      this.state.animation.setValue(event.nativeEvent.layout.height);
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  };

  render() {
    return (
      <Animated.View style={[styles.container, styles.shadow, { height: this.state.animation }]}>
        <TouchableOpacity onPress={this.toggle}>
          <View style={styles.titleContainer} onLayout={this._setMinHeight}>
            <View style={styles.title}>{this.props.title}</View>
            <Icon name={this.state.expanded ? 'chevron-up' : 'chevron-down'} size={24} />
          </View>

          <View style={styles.body} onLayout={this._setMaxHeight}>
            {this.props.children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
