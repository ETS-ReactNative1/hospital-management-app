import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

import { GradientButton, Block, Typography, Dialog } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO_CONDENSE } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';

const TextPackage = localization[AppData.language];

const displayData = {
  title: TextPackage.DEVICE_TITLE,
  model: TextPackage.MODEL,
  manufacturer: TextPackage.MANUFACTURER,
  activeState: TextPackage.ACTIVE_STATE
};

const SwitchDevice = props => {
  const { navigation } = props;
  const { deviceId } = navigation.state.params;
  const [createEvent] = useMutation(CREATE_EVENT);
  const [modalSwitchVisible, setModalSwitchVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [modalReportDoneVisible, setModalReportDoneVisible] = useState(false);

  const { loading, error, data, refetch } = useQuery(DEVICE_INFO_CONDENSE, {
    variables: {
      id: deviceId
    }
  });

  const handleStateSwitch = async () => {
    setModalSwitchVisible(true);
    await createEvent({ variables: { deviceId } });
  };

  const handleDialogConfirm = async () => {
    setModalSwitchVisible(false);
    navigation.goBack();
  };

  const handleReport = () => {
    console.log('report clicked');
    setModalReportVisible(true);
  };

  const handleReportConfirm = () => {
    setModalReportVisible(false);
    setModalReportDoneVisible(true);
  };

  const handleReportCancel = () => {
    setModalReportVisible(false);
  };

  const handleReportDoneConfirm = async () => {
    setModalReportDoneVisible(false);
    //*: Should refetch here because of muatation
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
        <Typography bold title>
          {error}
        </Typography>
      </Block>
    );
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
      {/* Continue Modal after change state */}
      <Dialog
        hideCancel
        visible={modalSwitchVisible}
        title={TextPackage.CHANGE_SUCCESS}
        confirmText={TextPackage.CONTINUE}
        handleConfirm={handleDialogConfirm}
      >
        <Typography body justify>
          {data.device.activeState ? TextPackage.SWITCH_OFF_MESSAGE : TextPackage.SWITCH_ON_MESSAGE}
        </Typography>
      </Dialog>

      {/* Confirm Modal for report state */}
      <Dialog
        visible={modalReportVisible}
        title={TextPackage.REPORT_STATE}
        confirmText={TextPackage.CONFIRM}
        handleConfirm={handleReportConfirm}
        handleCancel={handleReportCancel}
      >
        <Typography body justify>
          {TextPackage.REPORT_SWITCH_MESSAGE}
        </Typography>
      </Dialog>

      {/* Continue Modal after report state */}
      <Dialog
        hideCancel
        visible={modalReportDoneVisible}
        title={TextPackage.REPORT_SUCCESS}
        confirmText={TextPackage.CONTINUE}
        handleConfirm={handleReportDoneConfirm}
      >
        <Typography body justify>
          {TextPackage.REPORT_SWITCH_SUCCESS_MESSAGE}
        </Typography>
      </Dialog>

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
    </View>
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

export default SwitchDevice;
