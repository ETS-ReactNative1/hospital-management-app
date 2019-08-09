import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topLeftEdge: {
    position: 'absolute',
    top: 4,
    left: 4
  },
  topRightEdge: {
    position: 'absolute',
    top: 4,
    right: 4
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 4,
    left: 4
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 4,
    right: 4
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  maskInner: {
    backgroundColor: 'transparent'
  },
  maskFrame: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1
  },
  maskRow: {
    width: '100%'
  },
  maskCenter: {
    display: 'flex',
    flexDirection: 'row'
  },
  animatedLine: {
    position: 'absolute',
    elevation: 4,
    zIndex: 0,
    width: '100%'
  },
  hintTextStyle: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 8
  }
});

export default styles;
