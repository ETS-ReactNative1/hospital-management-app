import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { Block } from './components';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';
import Popup from './screens/App/Popup';
import { meActions, popupActions } from './redux/actions';
import meQuery from './utils/meQuery';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  }
});

const App = ({ updateMe, showPopup, hidePopup }) => {
  const [loading, setLoading] = useState(true);
  const [popupState, setPopupState] = useState(false);
  // Subscribe
  NetInfo.addEventListener(state => {
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
    const disconnected = !state.isConnected || !state.isInternetReachable;
    if (disconnected) {
      showPopup(AppConst.NO_INTERNET_POPUP);
      setPopupState(true);
    }

    if (popupState && !disconnected) {
      hidePopup();
      setPopupState(false);
    }
  });

  useEffect(() => {
    // console.log('fetched refresh-token');
    fetch(`${AppConst.SERVER_URL}/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async data => {
        const { accessToken } = await data.json();
        AppData.accessToken = accessToken;
        if (accessToken) {
          // console.log('fetched meQuery');
          const me = await meQuery();
          updateMe(me);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  });

  if (loading) {
    return (
      <Block middle center color="white">
        <Image style={styles.image} source={require('src/assets/images/auth.jpg')} />
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
