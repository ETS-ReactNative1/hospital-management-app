import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';
import { connect } from 'react-redux';

import { GradientButton, Block, Typography, Input } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { LASTEST_MAINTAIN_EVENT } from 'src/utils/graphqlQueries';
import { CREATE_MAINTAIN_EVENT } from 'src/utils/graphqlMutations';
import { popupActions } from 'src/redux/actions';

const TextPackage = localization[AppData.language];

const displayData = {
  name: TextPackage.MAINTAIN_COMPANY,
  address: TextPackage.ADDRESS,
  phone: TextPackage.PHONE,
  cost: TextPackage.MAINTAIN_COST,
  note: TextPackage.NOTE
};

const MaintainDevice = ({ navigation, showPopup, hidePopup }) => {
  const { deviceId } = navigation.state.params;
  const [newMaintainInfo, setNewMaintainInfo] = useState({
    name: null,
    address: null,
    phone: null,
    cost: null,
    note: null
  });

  const refMap = {
    address: useRef(),
    phone: useRef(),
    cost: useRef(),
    note: useRef()
  };

  const [maintainState, setMaintainState] = useState(true);
  const { loading, error, data } = useQuery(LASTEST_MAINTAIN_EVENT, { variables: { deviceId } });
  const [createMaintainEvent] = useMutation(CREATE_MAINTAIN_EVENT);

  useEffect(() => {
    if (!data || !data.lastestMaintainEvent) {
      return;
    }
    const { maintainInfo, finished } = data.lastestMaintainEvent;
    delete maintainInfo.__typename;
    setMaintainState(finished);
    setNewMaintainInfo({
      ...maintainInfo,
      cost: maintainInfo.cost.currencyFormat(false)
    });
  }, [data]);

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
          Error
        </Typography>
      </Block>
    );
  }

  /**
   * Show Continue Modal after report state
   */
  const handleReportConfirm = async () => {
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.REPORT_SUCCESS,
      message: TextPackage.REPORT_MAINTAIN_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: () => {
        hidePopup();
        //TODO: Implement report function
      }
    });
  };

  /**
   * Show Confirm Modal for report state
   */
  const handleReport = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.REPORT_STATE,
      message: TextPackage.REPORT_MAINTAIN_MESSAGE,
      handleConfirm: handleReportConfirm
    });
  };

  /**
   * Show Continue Modal for update maintain
   */
  const handleUpdateMaintainConfirm = () => {
    createMaintainEvent({
      variables: {
        deviceId,
        maintainInfo: {
          ...newMaintainInfo,
          cost: parseInt(newMaintainInfo.cost.split('.').join(''), 10)
        }
      }
    });
    showPopup(AppConst.OK_POPUP, {
      title: TextPackage.UPDATE_SUCCESS,
      message: TextPackage.UPDATE_SUCCESS_MESSAGE,
      confirmText: TextPackage.CONTINUE,
      handleConfirm: async () => {
        hidePopup();
        navigation.goBack();
      }
    });
  };

  /**
   * Show Confirm Modal for update maintain
   */
  const handleUpdateMaintain = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: maintainState
        ? TextPackage.MAINTAIN_UPDATE_CONFIRM
        : TextPackage.MAINTAIN_FINISHED_CONFIRM,
      message: maintainState
        ? TextPackage.MAINTAIN_UPDATE_CONFIRM_MESSAGE
        : TextPackage.MAINTAIN_FINISHED_CONFIRM_MESSAGE,
      handleConfirm: handleUpdateMaintainConfirm
    });
  };

  /**
   * Handle when text in Input changed
   * @param {string} key name of property
   * @param {string} text value of property
   */
  const handleTextChange = (key, text) => {
    setNewMaintainInfo({
      ...newMaintainInfo,
      [key]:
        key === 'cost'
          ? text
              .split('.')
              .join('')
              .formatMoney()
          : text
    });
  };

  /**
   * Handle to switch to the next Input when already submited the old Input
   * @param {string} key name of property
   */
  const handleSubmitEditing = key => {
    const ref = Object.values(refMap)[Object.keys(refMap).indexOf(key) + 1];
    ref && ref.current.textInputRef.current.focus();
  };

  return (
    <View style={{ flex: 1 }}>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {maintainState ? TextPackage.RECORD_START_MAINTAIN : TextPackage.RECORD_END_MAINTAIN}
        </Typography>
        {Object.entries(displayData).map(([key, title]) => {
          return (
            <Input
              key={key}
              name={key}
              style={generalStyles.input}
              ref={refMap[key]}
              defaultValue={newMaintainInfo[key]}
              rightText={key === 'cost' && 'VND'}
              label={title}
              value={newMaintainInfo[key]}
              onChangeText={text => handleTextChange(key, text)}
              onSubmitEditing={() => handleSubmitEditing(key)}
            />
          );
        })}
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButton}>
        <GradientButton
          shadow
          gradient
          startColor={theme.colors.redDark}
          endColor={theme.colors.redLight}
          onPress={handleReport}
        >
          <Typography body bold white center>
            {TextPackage.REPORT_STATE}
          </Typography>
        </GradientButton>
        <GradientButton shadow gradient onPress={handleUpdateMaintain}>
          <Typography title bold white center>
            {TextPackage.UPDATE_MAINTAIN}
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

MaintainDevice.navigationOptions = () => ({
  title: TextPackage.MAINTAIN_DEVICE
});

const mapDispatchToProps = dispatch => ({
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  },
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(null, mapDispatchToProps)(MaintainDevice);
