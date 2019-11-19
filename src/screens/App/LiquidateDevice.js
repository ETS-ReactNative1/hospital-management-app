import React, { useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { GradientButton, Block, Typography, Input } from 'src/components';
import { theme, localization, generalStyles } from 'src/constants';
import AppData from 'src/AppData';
import AppConst from 'src/AppConst';
import { DEVICE_AVAILABILITY } from 'src/utils/graphqlQueries';
import { CREATE_LIQUIDATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';
import { connect } from 'react-redux';
import { popupActions } from 'src/redux/actions';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const displayData = {
  name: TextPackage.LIQUIDATE_COMPANY,
  address: TextPackage.ADDRESS,
  phone: TextPackage.PHONE,
  price: TextPackage.LIQUIDATE_PRICE,
  note: TextPackage.NOTE
};

const LiquidateDevice = ({ navigation, showPopup }) => {
  const { deviceId } = navigation.state.params;
  const { loading, error, data } = useQuery(DEVICE_AVAILABILITY, { variables: { id: deviceId } });
  const [createLiquidateEvent] = useMutation(CREATE_LIQUIDATE_EVENT);
  const [liquidateInfo, setLiquidateInfo] = useState({
    name: '',
    address: '',
    phone: '',
    price: '0',
    note: ''
  });
  const refMap = {
    address: useRef(),
    phone: useRef(),
    price: useRef(),
    note: useRef()
  };

  if (loading) {
    return (
      <Block center middle>
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

  if (data.device.availability === 'liquidated') {
    showPopup(AppConst.NO_ACTIVE_POPUP, {
      availability: 'liquidated',
      handleConfirm: () => {
        navigation.goBack();
      }
    });
    return null;
  }

  /**
   * Handle when text in Input changed
   * @param {string} key name of property
   * @param {string} text value of property
   */
  const handleTextChange = (key, text) => {
    setLiquidateInfo({
      ...liquidateInfo,
      [key]:
        key === 'price'
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

  const handleLiquidateDeviceConfirm = async () => {
    try {
      await createLiquidateEvent({
        variables: {
          deviceId,
          liquidateInfo: {
            ...liquidateInfo,
            price: parseInt(liquidateInfo.price.split('.').join(''), 10)
          }
        }
      });
      showPopup(AppConst.OK_POPUP, {
        title: TextPackage.LIQUIDATE_SUCCESS,
        message: TextPackage.LIQUIDATE_SUCCESS_MESSAGE,
        confirmText: TextPackage.CONTINUE,
        handleConfirm: async () => {
          navigation.goBack();
        }
      });
    } catch (error) {
      graphqlErrorHandler(error);
    }
  };

  const handleLiquidateDevice = () => {
    showPopup(AppConst.OK_CANCEL_POPUP, {
      title: TextPackage.LIQUIDATE_CONFIRM,
      message: TextPackage.LIQUIDATE_CONFIRM_MESSAGE,
      handleConfirm: handleLiquidateDeviceConfirm
    });
  };

  return (
    <Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        {Object.entries(displayData).map(([key, value]) => {
          return (
            <Input
              key={key}
              name={key}
              label={value}
              style={generalStyles.input}
              value={liquidateInfo[key]}
              rightText={key === 'price' && 'VND'}
              onChangeText={text => handleTextChange(key, text)}
              onSubmitEditing={() => handleSubmitEditing(key)}
              ref={refMap[key]}
            />
          );
        })}
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={generalStyles.actionButtons}>
        <GradientButton
          gradient
          shadow
          startColor={theme.colors.redDark}
          endColor={theme.colors.redLight}
          onPress={handleLiquidateDevice}
        >
          <Typography title bold white center>
            {TextPackage.LIQUIDATE}
          </Typography>
        </GradientButton>
      </Block>
    </Block>
  );
};

LiquidateDevice.navigationOptions = () => ({
  title: TextPackage.LIQUIDATE_DEVICE
});

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  }
});

export default connect(null, mapDispatchToProps)(LiquidateDevice);
