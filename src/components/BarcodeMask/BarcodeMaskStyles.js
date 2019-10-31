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
    top: 8,
    left: 8
  },
  topRightEdge: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 8,
    left: 8
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 8,
    right: 8
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  },
  flashButtonStyle: {
    position: 'absolute',
    bottom: 8,
    display: 'flex',
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 16,
    backgroundColor: 'transparent'
  }
});

export default styles;
