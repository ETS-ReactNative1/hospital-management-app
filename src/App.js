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

String.prototype.toLocaleDateTimeString = function() {
  const datetime = new Date(this);
  const hour = datetime.getHours();
  let min = datetime.getMinutes();
  if (min < 10) min = `0${min}`;
  const sec = datetime.getSeconds();
  const date = datetime.getDate();
  const month = datetime.getMonth();
  const year = datetime.getFullYear();
  return `${hour}:${min}:${sec} - ${date}/${month}/${year}`;
};

/**
 * Format a Number to display as a currency type
 * @param {boolean} isIndex  display index indicator or not, default = true
 */
Number.prototype.currencyFormat = function(isIndex = true) {
  return `${this.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')}${isIndex ? ' VND' : ''}`;
};

String.prototype.formatMoney = function(decimalCount = 0, decimal = ',', thousands = '.') {
  let amount = this;
  decimalCount = Math.abs(decimalCount);
  decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;
  const negativeSign = amount < 0 ? '-' : '';
  const i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)), 10).toString();
  const j = i.length > 3 ? i.length % 3 : 0;

  return (
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
    (decimalCount
      ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
      : '')
  );
};

Number.prototype.milliSecToDuration = function() {
  let seconds = Math.floor((this / 1000) % 60);
  let minutes = Math.floor((this / (1000 * 60)) % 60);
  let hours = Math.floor((this / (1000 * 60 * 60)) % 24);
  let dates = Math.floor(this / (1000 * 60 * 60 * 24));
  seconds = seconds ? `${seconds} Giây` : '';
  minutes = minutes ? `${minutes} Phút ` : '';
  hours = hours ? `${hours} Tiếng ` : '';
  dates = dates ? `${dates} Ngày ` : '';
  return `${dates}${hours}${minutes}${seconds}`;
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

export default connect(null, mapDispatchToProps)(App);
