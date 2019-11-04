import React from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO } from 'src/utils/graphqlQueries';
import { useQuery } from 'react-apollo';

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

const SearchDevice = props => {
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
          {error}
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
              <View key={key}>
                <Typography gray height={theme.sizes.body * 2}>
                  {name}
                </Typography>
                {typeof data.device[key] === 'string' && !formatStrings.includes(key) && (
                  <Typography bold gray={!data.device[key]}>
                    {data.device[key] || '(Không rõ)'}
                  </Typography>
                )}
                {typeof data.device[key] === 'number' && (
                  <Typography bold gray={!data.device[key]}>
                    {data.device[key].currencyFormat() || '(Không rõ)'}
                  </Typography>
                )}
                {formatStrings.includes(key) && (
                  <Typography bold gray={!data.device[key]}>
                    {(key === 'startUseTime'
                      ? data.device[key].toLocaleDateString()
                      : availabilityVN[data.device[key]]) || '(Không rõ)'}
                  </Typography>
                )}
                {key === 'startUseState' && (
                  <Typography bold>
                    {data.device[key] ? TextPackage.NEW : TextPackage.USED}
                  </Typography>
                )}
                {key === 'activeState' && (
                  <Typography bold>
                    {data.device[key] ? TextPackage.STATE_ON : TextPackage.STATE_OFF}
                  </Typography>
                )}
              </View>
            );
          })}
        </ScrollView>
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButtons}>
        {data.device.availability === 'liquidated' && (
          <GradientButton
            shadow
            gradient
            startColor={theme.colors.redDark}
            endColor={theme.colors.redLight}
            onPress={() => navigation.navigate('LiquidateInfo')}
          >
            <Typography title bold white center>
              {TextPackage.LIQUIDATE_INFO}
            </Typography>
          </GradientButton>
        )}
        <GradientButton shadow gradient onPress={() => navigation.navigate('ActiveHistory')}>
          <Typography body bold white center>
            {TextPackage.ACTIVE_HISTORY}
          </Typography>
        </GradientButton>
        <GradientButton shadow onPress={() => navigation.navigate('MaintainHistory')}>
          <Typography body bold center>
            {TextPackage.MAINTAIN_HISTORY}
          </Typography>
        </GradientButton>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

SearchDevice.navigationOptions = () => ({
  title: TextPackage.SEARCH_DEVICE
});

export default SearchDevice;
