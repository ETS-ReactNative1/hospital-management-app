import React, { Component } from 'react';
import { Platform, UIManager, LayoutAnimation, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './ExpansionPanelStyles';

export default class ExpansionPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  changeLayout = () => {
    const { expanded } = this.state;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !expanded });
  };

  render() {
    const { expanded } = this.state;
    return (
      <View style={[styles.container, styles.shadow]}>
        <TouchableOpacity onPress={this.changeLayout}>
          <View style={styles.titleContainer}>
            <View style={styles.title}>{this.props.title}</View>
            <Icon name={this.state.expanded ? 'chevron-up' : 'chevron-down'} size={24} />
          </View>
          <View style={[styles.body, expanded ? styles.expandedBody : styles.collapsedBody]}>
            {this.props.children}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
