import { View } from 'react-native';

// Styles
import { Container } from './style';

export function ContainerLayout({ children }) {
 return (
   <Container>
        {children}
   </Container>
  );
}