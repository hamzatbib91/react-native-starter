import { BaseToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
    success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#00C851' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '500'
        }}
        text2Style={{
          fontSize: 13
        }}
      />
    ),
    error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#ff4444' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '500'
        }}
        text2Style={{
          fontSize: 13
        }}
      />
    ),
  };

  export default toastConfig;