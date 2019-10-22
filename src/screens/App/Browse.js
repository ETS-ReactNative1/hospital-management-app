import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { Card, Badge, GradientButton, Block, Typography } from 'src/components';
import { theme, mocks } from 'src/constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base,
    marginBottom: 0
  },
  category: {
    // this should be dynamic based on screen width
    width: '100%',
  }
});

export default class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'Products',
      categories: []
    };
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  render() {
    const { profile, navigation } = this.props;
    const { categories } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Typography h1 bold>
            Chức năng
          </Typography>
          <GradientButton onPress={() => navigation.navigate('Settings')}>
            <Image source={profile.avatar} style={styles.avatar} />
          </GradientButton>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} space="between" padding={[theme.sizes.base , theme.sizes.base * 2]} style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Explore', { category })}
              >
                <Card center middle shadow row style={styles.category}>
                  <Badge size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                  <Block padding={[0, theme.sizes.base]} >
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

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories
};
