import React, { useEffect, useState } from 'react';
import { Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

import { Block } from './components';
import AppConst from './AppConst';
import AppData from './AppData';
import Navigation from './screens';
import { localization, generalStyles } from './constants';
import Popup from './screens/App/Popup';
import { meActions, popupActions } from './redux/actions';
import meQuery from './utils/meQuery';

const TextPackage = localization[AppData.language];

const App = ({ updateMe, showPopup, hidePopup }) => {
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  // Subscribe
  NetInfo.addEventListener(state => {
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
    const disconnected = !state.isConnected || !state.isInternetReachable;
    if (disconnected) {
      showPopup(AppConst.NO_INTERNET_POPUP);
    }

    if (!disconnected) {
      hidePopup();
    }
  });

  useEffect(() => {
    // console.log('axios called');
    axios({
      method: 'POST',
      withCredentials: true,
      url: `${AppConst.SERVER_URL}/refresh-token`,
      timeout: 4000
    })
      .then(async response => {
        if (response.status === 200) {
          const { accessToken } = response.data;
          if (accessToken) {
            // console.log('fetched meQuery');
            const me = await meQuery(accessToken);
            me.accessToken = accessToken;
            updateMe(me);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        if (err.message === 'timeout of 4000ms exceeded' || err.message === 'Network Error') {
          showPopup(AppConst.OK_CANCEL_POPUP, {
            title: TextPackage.TIMEOUT_ERR,
            message: TextPackage.TIMEOUT_ERR_MESSAGE,
            confirmText: TextPackage.RETRY,
            cancelText: TextPackage.EXIT,
            handleCancel: () => {
              BackHandler.exitApp();
            },
            handleConfirm: () => {
              setRetry(!retry);
            }
          });
        }
      });
  });

  if (loading) {
    return (
      <Block middle center color="white">
        <Image style={generalStyles.image} source={require('src/assets/images/auth.jpg')} />
        <Popup />
      </Block>
    );
  }

  return (
    <Block>
      <Navigation />
      <Popup />
    </Block>
  );
};

const mapDispatchToProps = dispatch => ({
  showPopup: (popupType, popupProps) => {
    dispatch(popupActions.showPopup(popupType, popupProps));
  },
  hidePopup: () => {
    dispatch(popupActions.hidePopup());
  },
  updateMe: me => {
    dispatch(meActions.updateMe(me));
  }
});

export default connect(null, mapDispatchToProps)(App);
