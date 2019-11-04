import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';

import { GradientButton, Block, Typography, Divider } from 'src/components';
import { theme, localization } from 'src/constants';
import { ME } from 'src/utils/graphqlQueries';
import AppData from 'src/AppData';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center'
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
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

  data && console.log(data);
  const { userProfile } = AppData;

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
        <Image key="avatar" style={styles.image} source={userProfile.avatar} />

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
