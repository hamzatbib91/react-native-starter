import { BaseToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
  /**
   * @description Customizes the success toast.
   * @param {React.JSX.IntrinsicAttributes & BaseToastProps} props The props passed to the BaseToast component.
   * @returns The customized success toast.
   */
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
  /**
   * @description Customizes the error toast.
   * @param {React.JSX.IntrinsicAttributes & BaseToastProps} props The props passed to the BaseToast component.
   * @returns The customized error toast.
   */
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