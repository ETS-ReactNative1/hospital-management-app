import React from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { DEVICE_INFO_CONDENSE } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';
import { connect } from 'react-redux';
import { popupActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const displayData = {
  title: TextPackage.DEVICE_TITLE,
  model: TextPackage.MODEL,
  manufacturer: TextPackage.MANUFACTURER,
  activeState: TextPackage.ACTIVE_STATE
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

  if (loading) {
    return (
      <Block middle center>
        <ActivityIndicator />
      </Block>
    );
  }

  if (error) {
    return (
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        <Typography bold title>
          {error}
        </Typography>
      </Block>
    );
  }

  if (data.device.availability !== 'active') {
    return (
      <Block middle center>
        <Image
          style={styles.image}
          source={
            data.device.availability === 'maintaining'
              ? require('src/assets/images/maintaining.jpg')
              : require('src/assets/images/liquidated.jpg')
          }
        />
        <Block center padding={[0, theme.sizes.base * 5]}>
          <Typography bold title uppercase>
            {data.device.availability === 'maintaining'
              ? TextPackage.DEVICE_MAINTAINING
              : TextPackage.DEVICE_LIQUIDATED}
          </Typography>
          <Typography center gray>
            {data.device.availability === 'maintaining'
              ? TextPackage.DEVICE_MAINTAINING_DESC
              : TextPackage.DEVICE_LIQUIDATED_DESC}
          </Typography>
        </Block>
      </Block>
    );
  }

  //Continue Modal after change state
  const handleStateSwitch = async () => {
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.CHANGE_SUCCESS,
      message: data.device.activeState
        ? TextPackage.SWITCH_OFF_MESSAGE
        : TextPackage.SWITCH_ON_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: async () => {
        hidePopup();
        await createEvent({ variables: { deviceId } });
        navigation.goBack();
      }
    });
  };
  // Continue Modal after report state
  const handleReportConfirm = async () => {
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.REPORT_SUCCESS,
      message: TextPackage.REPORT_SWITCH_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: async () => {
        hidePopup();
        //*: Should refetch here because of muatation (still not implement)
        await refetch();
      }
    });
  };
  // Confirm Modal for report state
  const handleReport = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.REPORT_STATE,
      message: TextPackage.REPORT_SWITCH_MESSAGE,
      confirmText: TextPackage.CONFIRM,
      handleConfirm: handleReportConfirm
    });
  };

  return (
    <Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        {Object.entries(displayData).map(([key, name]) => {
          return (
            <View key={key}>
              <Typography gray height={theme.sizes.body * 2}>
                {name}
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
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButtons}>
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
    </Block>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
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
  title: TextPackage.SWITCH_DEVICE
});

const mapDispatchToProps = dispatch => ({
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  },
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SwitchDevice);
