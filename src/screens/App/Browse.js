import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AppConst from 'src/AppConst';
import { Card, Badge, Block, Typography } from 'src/components';
import { theme, mocks } from 'src/constants';
import { popupActions } from 'src/redux/actions';

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.thumbnail,
    width: theme.sizes.thumbnail,
    borderRadius: theme.sizes.thumbnail * 0.5
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base,
    marginBottom: 0
  },
  shadow: {
    shadowColor: theme.colors.black, // IOS
    shadowOffset: { height: 0, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 75, //IOS
    elevation: 5, // Android
    width: theme.sizes.thumbnail,
    height: theme.sizes.thumbnail,
    borderRadius: theme.sizes.thumbnail * 0.5
  }
});

const Browse = ({ role, showPopup, navigation }) => {
  const handleCategoryPressed = category => {
    if (category.role.includes(role)) navigation.navigate('QRScan', category);
    else showPopup(AppConst.NO_PERMISSION_POPUP);
  };

  const requestCameraPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <Block
      // flex={false}
      // space="between"
      padding={[theme.sizes.base, theme.sizes.base * 2]}
      style={styles.categories}
      center
      middle
    >
      {mocks.categories.map(category => (
        <TouchableOpacity key={category.id} onPress={() => handleCategoryPressed(category)}>
          <Card flex={false} center middle shadow row fullWidth>
            <Badge size={56} color="rgba(41,216,143,0.20)">
              <Icon name={category.icon} size={36} color={theme.colors.green} />
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

// Use memo here to prevent unneccessary re-render
const Avatar = memo(
  ({ avatar, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.shadow}>
        <Image source={avatar} style={styles.avatar} />
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => nextProps.avatar === prevProps.avatar
);

const mapStateToProps = state => state.me;

const AvatarComponent = connect(mapStateToProps)(Avatar);

Browse.navigationOptions = ({ navigation }) => {
  return {
    title: 'Chức năng',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: theme.sizes.header,
      marginLeft: theme.sizes.base * 2
    },
    headerRight: () => (
      <AvatarComponent
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    )
  };
};

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
