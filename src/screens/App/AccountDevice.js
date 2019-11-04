import React from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';

const TextPackage = localization[AppData.language];

const displayData = {
  title: 'DEVICE_TITLE',
  model: 'MODEL',
  manufacturer: 'MANUFACTURER',
  origin: 'ORIGIN',
  manufacturedYear: 'MANUFACTURED_YEAR',
  startUseTime: 'START_USE_TIME',
  startUseState: 'START_USE_STATE',
  originalPrice: 'ORIGINAL_PRICE',
  currentPrice: 'CURRENT_PRICE',
  availability: 'AVAILABILITY',
  faculty: 'FACULTY',
  activeState: 'ACTIVE_STATE'
};

String.prototype.toLocaleDateString = function() {
  return this.split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

const AccountDevice = props => {
  const { navigation } = props;
  const { deviceId } = navigation.state.params;

  const { loading, error, data } = useQuery(DEVICE_INFO, {
    variables: {
      id: deviceId
    }
  });

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
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        <Typography bold title height={theme.sizes.title * 2}>
          Error
        </Typography>
      </Block>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        <ScrollView style={{ flex: 1, maxHeight: '60%' }}>
          {Object.entries(displayData).map(([key, name]) => {
            return (
              <View>
                <Typography key={name} gray height={theme.sizes.body * 2}>
                  {TextPackage[name]}
                </Typography>
                {typeof data.device[key] !== 'boolean' && key !== 'startUseTime' && (
                  <Typography key={key} bold gray={!data.device[key]}>
                    {data.device[key] || '(Không rõ)'}
                  </Typography>
                )}
                {key === 'startUseTime' && (
                  <Typography key={key} bold gray={!data.device[key]}>
                    {data.device[key].toLocaleDateString() || '(Không rõ)'}
                  </Typography>
                )}
                {key === 'startUseState' && (
                  <Typography key={key} bold>
                    {data.device[key] ? TextPackage.NEW : TextPackage.USED}
                  </Typography>
                )}
                {key === 'activeState' && (
                  <Typography key={key} bold>
                    {data.device[key] ? TextPackage.STATE_ON : TextPackage.STATE_OFF}
                  </Typography>
                )}
              </View>
            );
          })}
        </ScrollView>
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButton}>
        <GradientButton shadow gradient>
          <Typography body bold white center>
            {TextPackage.ACTIVE_HISTORY}
          </Typography>
        </GradientButton>
        <GradientButton shadow>
          <Typography body bold center>
            {TextPackage.MAINTAIN_INFO}
          </Typography>
        </GradientButton>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

AccountDevice.navigationOptions = () => ({
  title: TextPackage.ACCOUNT_DEVICE
});

export default AccountDevice;
