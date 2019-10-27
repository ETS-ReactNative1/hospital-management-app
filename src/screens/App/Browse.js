import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, Badge, GradientButton, Block, Typography } from 'src/components';
import { theme, mocks } from 'src/constants';
import AppData from 'src/AppData';

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
    borderRadius: 50
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base,
    marginBottom: 0
  },
  category: {
    width: '100%'
  }
});

export default class Browse extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chức năng',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={{
            alignItems: 'center',
            paddingRight: theme.sizes.padding
          }}
        >
          <Image source={AppData.userProfile.avatar} style={styles.avatar} />
        </TouchableOpacity>
      )
    };
  };

  render() {
    const { navigation } = this.props;
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block
            flex={false}
            space="between"
            padding={[theme.sizes.base, theme.sizes.base * 2]}
            style={styles.categories}
          >
            {mocks.categories.map(category => (
              <TouchableOpacity
                key={category.id}
                onPress={() => navigation.navigate('QRScan', category)}
              >
                <Card center middle shadow row style={styles.category}>
                  <Badge size={50} color="rgba(41,216,143,0.20)">
                    <Icon name={category.icon} size={24} color={theme.colors.green} />
                  </Badge>
                  <Block padding={[0, theme.sizes.base]}>
                    <Typography medium height={20}>
                      {category.name}
                    </Typography>
                    <Typography gray caption>
                      {category.description}
                    </Typography>
                  </Block>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}
