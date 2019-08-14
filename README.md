# Hospital Management React Native

This is a React Native project, so first, you have to install environment for development. Check out how to setup environment at https://facebook.github.io/react-native/docs/getting-started. Please choose React Native CLI Quickstart way to install because this project does not depend on Expo.

---

## Installation

Run these command in your command line to install:

```
npm install
```

## Run on your devices

You can run app in your emulators and real devices. Run these command in your command line to start development:

iOS

```
react-native run-ios
```

Android

```
react-native run-android
```

P/S: To avoid any unwanted errors, please run your command line or terminal with administrator privilege.

---

## Development TODO

### Authentication

- ✔️ Sign In UI
- ✔️ Sign Up UI
- ✔️ Forgot Password UI
- ✔️ Sign In, Sign Out by storing mock token with AsyncStorage API (store key in device's memory)
- ❌ Optimize form typing for all Input
- ❌ Backend for handling all authentication task (NodeJS, PostgreSQL, Redis, JWT, session, bcrypt,...)
- ...


### Application

- ✔️ QR Scan using react-native-camera
- ✔️ QR Scan mask for user to focus
- ❌ Settings Fragment for user and app control
- ❌ Backend to handle main business logics
- ❌ Features for admin
- ...