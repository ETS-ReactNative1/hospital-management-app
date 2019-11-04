import React from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import { DEVICE_INFO_CONDENSE } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';
import { actions } from 'src/utils/reduxStore';
import { connect } from 'react-redux';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';

const TextPackage = localization[AppData.language];

const displayData = {
  title: 'DEVICE_TITLE',
  model: 'MODEL',
  manufacturer: 'MANUFACTURER',
  activeState: 'ACTIVE_STATE'
};

const SwitchDevice = props => {
  const { navigation, showPopup, hidePopup } = props;
  const { deviceId } = navigation.state.params;
  const [createEvent] = useMutation(CREATE_EVENT);

  const { loading, error, data, refetch } = useQuery(DEVICE_INFO_CONDENSE, {
    variables: {
      id: deviceId
    }
  });

  const handleStateSwitch = async () => {
    showPopup({
      type: AppConst.OK_POPUP,
      title: TextPackage.CHANGE_SUCCESS,
      message: data.device.activeState
        ? TextPackage.SWITCH_OFF_MESSAGE
        : TextPackage.SWITCH_ON_MESSAGE,
      okText: TextPackage.CONTINUE,
      okFunc: () => {
        hidePopup();
        navigation.goBack();
      }
    });
    await createEvent({ variables: { deviceId } });
  };

  const handleReportConfirm = async () => {
    showPopup({
      type: AppConst.OK_POPUP,
      title: TextPackage.REPORT_SUCCESS,
      message: TextPackage.REPORT_SWITCH_SUCCESS_MESSAGE,
      okText: TextPackage.CONTINUE,
      okFunc: async () => {
        hidePopup();
        await refetch();
      }
    });
  };

  const handleReport = () => {
    showPopup({
      type: AppConst.OK_CANCEL_POPUP,
      title: TextPackage.REPORT_STATE,
      message: TextPackage.REPORT_SWITCH_MESSAGE,
      okText: TextPackage.CONFIRM,
      okFunc: handleReportConfirm
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
    showPopup({
      type: AppConst.ERROR_POPUP,
      errorMsg: error.message
    });
  }

  if (data.device.availability === 'maintaining') {
    return (
      <Block middle center>
        <Image style={styles.image} source={require('src/assets/images/maintaining.jpg')} />
        <Block center padding={[0, theme.sizes.base * 5]}>
          <Typography title transform="uppercase">
            {TextPackage.DEVICE_MAINTAINING}
          </Typography>
          <Typography center gray>
            {TextPackage.DEVICE_MAINTAINING_DESC}
          </Typography>
        </Block>
      </Block>
    );
  }

  if (data.device.availability === 'liquidated') {
    return (
      <Block middle center>
        <Image style={styles.image} source={require('src/assets/images/liquidated.jpg')} />
        <Block center padding={[0, theme.sizes.base * 5]}>
          <Typography title transform="uppercase">
            {TextPackage.DEVICE_LIQUIDATED}
          </Typography>
          <Typography center gray>
            {TextPackage.DEVICE_LIQUIDATED_DESC}
          </Typography>
        </Block>
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
            <View key={key}>
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
          onPress={handleReport}
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
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10
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

export default connect(
  null,
  actions
)(SwitchDevice);
