/**
 * @format
 */
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import App from './src/App';
import { name as appName } from './app.json';
import graphqlClient from './src/utils/graphqlClient';
import store from './src/redux/store';

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

const ApolloApp = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <App />
      </Provider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => ApolloApp);
