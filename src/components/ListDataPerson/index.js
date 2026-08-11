import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Style
import { 
    Container,
    ViewInfo,
    TextInfo,
    ViewValue,
    TextValue,
} from './style';

export function ListDataPerson({ data, isLast }) {
 
    const theme = useTheme();

    return (
   <Container isLast={isLast}>
        {/* Info */}
        <ViewInfo>
            <FontAwesome5 name={data.icon} size={16} color={theme.colors.blue} />
            <TextInfo>{data.name}</TextInfo>
        </ViewInfo>
        
        {/* Value */}
        <ViewValue>
            <TextValue>{data.value}</TextValue>
        </ViewValue>
   </Container>
  );
}