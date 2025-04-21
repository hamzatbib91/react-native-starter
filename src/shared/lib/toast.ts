import Toast from 'react-native-toast-message';

export const showToast = {
  success: (message: string, description = '') => {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  error: (message: string, description = '') => {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
  info: (message: string, description = '') => {
    Toast.show({
      type: 'info',
      text1: message,
      text2: description,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  },
}; 