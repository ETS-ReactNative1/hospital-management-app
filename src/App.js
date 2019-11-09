import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Block } from './components';
import AppData from './AppData';
import AppConst from './AppConst';
import Navigation from './screens';
import Popup from './screens/App/Popup';
import { meActions, popupActions } from './redux/actions';
import meQuery from './utils/meQuery';

//TODO: Implement redux to manage global state through this tutorial: https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b

String.prototype.toLocaleDateString = function() {
  return this.split('T')[0]
    .split('-')
    .reverse()
    .join('/');
};

Number.prototype.currencyFormat = function() {
  return `${this.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')} VND`;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  }
});

const App = ({ updateMe }) => {
  const [loading, setLoading] = useState(true);

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

export default connect(
  null,
  mapDispatchToProps
)(App);
