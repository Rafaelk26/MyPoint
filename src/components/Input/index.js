// Styles
import { InputView } from './style';

export function Input({ placeholder, ...rest }) {
  return (
    <InputView
      placeholder={placeholder}
      placeholderTextColor="#B1B1B1"
      {...rest}
    />
  );
}