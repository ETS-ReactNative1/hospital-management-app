import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO_CONDENSE } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';

const TextPackage = localization[AppData.language];

const displayData = {
  title: 'DEVICE_TITLE',
  model: 'MODEL',
  manufacturer: 'MANUFACTURER',
  activeState: 'ACTIVE_STATE'
};

const SwitchDevice = props => {
  const { navigation } = props;
  const { deviceId } = navigation.state.params;
  const [createEvent] = useMutation(CREATE_EVENT);

  const { loading, error, data, refetch } = useQuery(DEVICE_INFO_CONDENSE, {
    variables: {
      id: deviceId
    }
  });

  const handleStateSwitch = async () => {
    await createEvent({ variables: { deviceId } });
    //*: Should use refetch here because query cache does not automatically update
    //TODO: Add Modal later when it finished
    await refetch();
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
        {Object.entries(displayData).map(([key, name]) => {
          return (
            <View>
              <Typography gray height={theme.sizes.body * 2}>
                {TextPackage[name]}
              </Typography>
              {typeof data.device[key] !== 'boolean' && (
                <Typography bold gray={!data.device[key]}>
                  {data.device[key] || '(Không rõ)'}
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
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButton}>
        <GradientButton
          gradient
          shadow
          startColor={theme.colors.redDark}
          endColor={theme.colors.redLight}
        >
          <Typography body bold white center>
            {TextPackage.REPORT_STATE}
          </Typography>
        </GradientButton>
        <GradientButton gradient shadow onPress={handleStateSwitch}>
          <Typography title bold white center>
            {data.device.activeState ? TextPackage.TURN_OFF : TextPackage.TURN_ON}
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

SwitchDevice.navigationOptions = () => ({
  title: TextPackage.SWITCH_DEVICE,
  headerTitleStyle: {
    marginLeft: 0,
    fontSize: theme.sizes.header,
    fontWeight: 'bold'
  }
});

export default SwitchDevice;
