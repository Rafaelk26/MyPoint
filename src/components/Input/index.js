// Styles
import { InputView } from './style';

export function Input({ placeholder, type, ...rest }) {
 return (
    <InputView
      keyboardType={type}
      placeholder={placeholder} 
      placeholderTextColor={'#B1B1B1'}
      {...rest}
    />
  );
}