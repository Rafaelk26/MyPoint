import { ActivityIndicator } from 'react-native';

// Styles
import { SubmitButton, ViewChildren, ViewTextsButton, SubmitButtonText, SubmitButtonSubtitle } from './style';

export function ButtonSubmit({ title, subtitle, onPress, children, loading, disabled }) {
 return (
   <SubmitButton onPress={onPress} disabled={loading || disabled} activeOpacity={0.7}>
      <ViewChildren>
        {children}
      </ViewChildren>
      <ViewTextsButton>
        {loading ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <>
            <SubmitButtonText>{title}</SubmitButtonText>
            {subtitle && (
              <SubmitButtonSubtitle>{subtitle}</SubmitButtonSubtitle>
            )}
          </>
        )}
      </ViewTextsButton>
   </SubmitButton>
  );
}