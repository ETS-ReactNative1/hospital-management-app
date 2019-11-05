import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';

import { GradientButton, Block, Typography, Divider } from 'src/components';
import { theme, localization } from 'src/constants';
import { ME } from 'src/utils/graphqlQueries';
import { AVATAR_UPLOAD } from 'src/utils/graphqlMutations';
import AppData from 'src/AppData';
import ImagePicker from 'react-native-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';

const styles = StyleSheet.create({
  image: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.sizes.avatar * 0.5
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  shadow: {
    shadowColor: theme.colors.black, // IOS
    shadowOffset: { height: 0, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 75, //IOS
    elevation: 5, // Android
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.sizes.avatar * 0.5,
    alignSelf: 'center'
  }
});

const TextPackage = localization[AppData.language];

const displayData = {
  email: TextPackage.EMAIL,
  role: TextPackage.ROLE,
  personal: {
    lastName: TextPackage.SURNAME,
    firstName: TextPackage.NAME,
    phone: TextPackage.PHONE
  }
};

const SettingsScreen = () => {
  const { loading, error, data } = useQuery(ME);
  const [avatarUpload] = useMutation(AVATAR_UPLOAD);
  const { userProfile } = AppData;

  const [avatarSource, setAvatarSource] = useState(userProfile.avatar);

  const handleAvatarSelect = () => {
    const options = {
      title: 'Chọn ảnh đại diện',
      takePhotoButtonTitle: 'Chụp ảnh...',
      chooseFromLibraryButtonTitle: 'Chọn từ Thư viện...',
      cancelButtonTitle: 'Hủy bỏ',
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('ImagePicker Cancel');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        const file = new ReactNativeFile({
          uri: response.uri,
          type: response.type,
          name: response.fileName
        });
        await avatarUpload({ variables: { file } });
        userProfile.avatar = source;
        setAvatarSource(source);
      }
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title>
          {error}
        </Typography>
      </Block>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <TouchableOpacity style={styles.shadow} onPress={handleAvatarSelect}>
          <Image key="avatar" style={styles.image} source={avatarSource} />
        </TouchableOpacity>

        {Object.entries(displayData).map(([key, name]) => {
          if (typeof name === 'string') {
            return (
              <View key={key}>
                <Typography gray height={theme.sizes.body * 2}>
                  {name}
                </Typography>
                <Typography bold gray={!data.me[key]}>
                  {data.me[key] || TextPackage.UNKNOWN}
                </Typography>
              </View>
            );
          }

          if (key === 'personal') {
            return (
              <View key={key}>
                <Divider />
                <Block flex={false} center row space="between">
                  <Typography bold title>
                    {TextPackage.PERSONAL_INFO}
                  </Typography>
                  <TouchableOpacity>
                    <Typography bold primary>
                      {TextPackage.EDIT}
                    </Typography>
                  </TouchableOpacity>
                </Block>
                {Object.entries(name).map(([key, name]) => {
                  return (
                    <View key={key}>
                      <Typography gray height={theme.sizes.body * 2}>
                        {name}
                      </Typography>
                      <Typography bold gray={!data.me[key]}>
                        {data.me[key] || TextPackage.UNKNOWN}
                      </Typography>
                    </View>
                  );
                })}
              </View>
            );
          }

          return null;
        })}
      </Block>

      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButtons}>
        <GradientButton shadow>
          <Typography bold center body>
            {TextPackage.CHANGE_PASSWORD}
          </Typography>
        </GradientButton>

        <GradientButton
          gradient
          shadow
          startColor={theme.colors.redDark}
          endColor={theme.colors.redLight}
        >
          <Typography white bold center title>
            {TextPackage.SIGN_OUT}
          </Typography>
        </GradientButton>
      </Block>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: TextPackage.SETUP
};

export default SettingsScreen;
