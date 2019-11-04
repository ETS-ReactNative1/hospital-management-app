import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuery, useMutation } from 'react-apollo';

import { Card, Badge, Block, Typography } from 'src/components';
import { theme, mocks } from 'src/constants';
import AppData from 'src/AppData';
import { ME } from 'src/utils/graphqlQueries';

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
  }
});

const Browse = props => {
  const { navigation } = props;

  return (
    <Block
      flex={false}
      space="between"
      padding={[theme.sizes.base, theme.sizes.base * 2]}
      style={styles.categories}
    >
      {mocks.categories.map(category => (
        <TouchableOpacity key={category.id} onPress={() => navigation.navigate('QRScan', category)}>
          <Card flex={false} center middle shadow row fullWidth>
            <Badge size={50} color="rgba(41,216,143,0.20)">
              <Icon name={category.icon} size={24} color={theme.colors.green} />
            </Badge>
            <Block padding={[0, theme.sizes.base]}>
              <Typography medium body>
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
  );
};

Browse.navigationOptions = ({ navigation }) => {
  return {
    title: 'Chức năng',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: theme.sizes.header,
      marginLeft: theme.sizes.base * 2
    },
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={{
          alignItems: 'center',
          paddingRight: theme.sizes.padding
        }}
      >
        {AppData.userProfile.avatar ? (
          <Image source={AppData.userProfile.avatar} style={styles.avatar} />
        ) : (
          <Image source={require('src/assets/images/avatar.png')} style={styles.avatar} />
        )}
      </TouchableOpacity>
    )
  };
};

export default Browse;
