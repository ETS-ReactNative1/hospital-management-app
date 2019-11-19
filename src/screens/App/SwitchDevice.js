import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';
import { connect } from 'react-redux';

import { GradientButton, Block, Typography } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { DEVICE_INFO_CONDENSE } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { popupActions } from 'src/redux/actions';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const displayData = {
  title: TextPackage.DEVICE_TITLE,
  model: TextPackage.MODEL,
  manufacturer: TextPackage.MANUFACTURER,
  activeState: TextPackage.ACTIVE_STATE
};

const SwitchDevice = ({ navigation, showPopup }) => {
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
    graphqlErrorHandler(error, () => {
      navigation.goBack();
    });
    return null;
  }

  const { device } = data;

  if (device.availability !== 'active') {
    showPopup(AppConst.NO_ACTIVE_POPUP, {
      availability: device.availability
    });
  }

  const handleStateSwitchConfirm = async () => {
    try {
      await createEvent({ variables: { deviceId } });
      navigation.goBack();
    } catch (error) {
      graphqlErrorHandler(error);
    }
  };

  //Continue Modal after change state
  const handleStateSwitch = () => {
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.CHANGE_SUCCESS,
      message: device.activeState ? TextPackage.SWITCH_OFF_MESSAGE : TextPackage.SWITCH_ON_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: handleStateSwitchConfirm
    });
  };
  // Continue Modal after report state
  const handleReportConfirm = () => {
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.REPORT_SUCCESS,
      message: TextPackage.REPORT_SWITCH_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: async () => {
        //*: Should refetch here because of mutation (still not implement)
        await refetch();
      }
    });
  };
  // Confirm Modal for report state
  const handleReport = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.REPORT_STATE,
      message: TextPackage.REPORT_SWITCH_MESSAGE,
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
              {typeof device[key] !== 'boolean' && (
                <Typography bold gray={!device[key]}>
                  {device[key] || TextPackage.UNKNOWN}
                </Typography>
              )}
              {key === 'activeState' && (
                <Typography bold>
                  {device[key] ? TextPackage.STATE_ON : TextPackage.STATE_OFF}
                </Typography>
              )}
            </View>
          );
        })}
      </Block>
      {device.availability === 'active' && (
        <Block
          padding={[theme.sizes.base, theme.sizes.base * 2]}
          style={generalStyles.actionButtons}
        >
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
              {device.activeState ? TextPackage.TURN_OFF : TextPackage.TURN_ON}
            </Typography>
          </GradientButton>
        </Block>
      )}
    </Block>
  );
};

SwitchDevice.navigationOptions = () => ({
  title: TextPackage.SWITCH_DEVICE
});

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(null, mapDispatchToProps)(SwitchDevice);
