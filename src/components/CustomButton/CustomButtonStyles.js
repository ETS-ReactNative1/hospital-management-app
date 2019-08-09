import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
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
    padding: 16
  },

  text: { fontSize: 14, textAlign: 'center', color: '#FFFFFF' }
});

export default styles;
