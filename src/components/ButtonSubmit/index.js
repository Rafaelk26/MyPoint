
// Styles
import { SubmitButton, ViewChildren, ViewTextsButton, SubmitButtonText, SubmitButtonSubtitle } from './style';

export function ButtonSubmit({ title, subtitle, onPress, children }) {
 return (
   <SubmitButton onPress={onPress}>
      <ViewChildren>
        {children}
      </ViewChildren>
      <ViewTextsButton>
        <SubmitButtonText>{title}</SubmitButtonText>
        {subtitle && (
          <SubmitButtonSubtitle>{subtitle}</SubmitButtonSubtitle>
        )}
      </ViewTextsButton>
   </SubmitButton>
  );
}