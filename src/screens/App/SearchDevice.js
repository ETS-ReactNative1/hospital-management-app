import React from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const displayData = {
  title: TextPackage.DEVICE_TITLE,
  model: TextPackage.MODEL,
  manufacturer: TextPackage.MANUFACTURER,
  origin: TextPackage.ORIGIN,
  manufacturedYear: TextPackage.MANUFACTURED_YEAR,
  startUseTime: TextPackage.START_USE_TIME,
  startUseState: TextPackage.START_USE_STATE,
  originalPrice: TextPackage.ORIGINAL_PRICE,
  currentPrice: TextPackage.CURRENT_PRICE,
  availability: TextPackage.AVAILABILITY,
  faculty: TextPackage.FACULTY,
  activeState: TextPackage.ACTIVE_STATE
};

const availabilityVN = {
  active: TextPackage.ACTIVE,
  maintaining: TextPackage.MAINTAINING,
  liquidated: TextPackage.LIQUIDATED
};

const formatStrings = ['startUseTime', 'availability'];

const SearchDevice = ({ navigation }) => {
  const { deviceId } = navigation.state.params;

  const { loading, error, data } = useQuery(DEVICE_INFO, {
    variables: {
      id: deviceId
    }
  });

  if (loading) {
    return (
      <Block middle center>
        <ActivityIndicator />
      </Block>
    );
  }

  if (error) {
    graphqlErrorHandler(error, () => {
      navigation.goBack();
    });
    return null;
  }

  const { device } = data;

  return (
    <Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        <ScrollView style={{ flex: 1, maxHeight: '60%' }}>
          {Object.entries(displayData).map(([key, name]) => {
            return (
              <View key={key}>
                <Typography gray height={theme.sizes.body * 2}>
                  {name}
                </Typography>
                {typeof device[key] === 'string' && !formatStrings.includes(key) && (
                  <Typography bold gray={!device[key]}>
                    {device[key] || TextPackage.UNKNOWN}
                  </Typography>
                )}
                {typeof device[key] === 'number' && (
                  <Typography bold gray={!device[key]}>
                    {device[key].currencyFormat() || TextPackage.UNKNOWN}
                  </Typography>
                )}
                {formatStrings.includes(key) && (
                  <Typography
                    bold
                    gray={!device[key]}
                    color={device[key] === 'liquidated' && theme.colors.redDark}
                  >
                    {(key === 'startUseTime'
                      ? device[key].toLocaleDateString()
                      : availabilityVN[device[key]]) || TextPackage.UNKNOWN}
                  </Typography>
                )}
                {key === 'startUseState' && (
                  <Typography bold>{device[key] ? TextPackage.NEW : TextPackage.USED}</Typography>
                )}
                {key === 'activeState' && (
                  <Typography bold>
                    {device[key] ? TextPackage.STATE_ON : TextPackage.STATE_OFF}
                  </Typography>
                )}
              </View>
            );
          })}
        </ScrollView>
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={generalStyles.actionButtons}>
        {device.availability === 'liquidated' && (
          <GradientButton
            shadow
            gradient
            startColor={theme.colors.redDark}
            endColor={theme.colors.redLight}
            onPress={() => navigation.navigate('LiquidateInfo', { deviceId })}
          >
            <Typography title bold white center>
              {TextPackage.LIQUIDATE_INFO}
            </Typography>
          </GradientButton>
        )}
        <GradientButton
          shadow
          gradient
          onPress={() => navigation.navigate('ActiveHistory', { deviceId })}
        >
          <Typography body bold white center>
            {TextPackage.ACTIVE_HISTORY}
          </Typography>
        </GradientButton>
        <GradientButton
          gradient
          startColor={theme.colors.yellowDark}
          endColor={theme.colors.yellowLight}
          shadow
          onPress={() => navigation.navigate('MaintainHistory', { deviceId })}
        >
          <Typography body bold center>
            {TextPackage.MAINTAIN_HISTORY}
          </Typography>
        </GradientButton>
      </Block>
    </Block>
  );
};

SearchDevice.navigationOptions = () => ({
  title: TextPackage.SEARCH_DEVICE
});

export default SearchDevice;
