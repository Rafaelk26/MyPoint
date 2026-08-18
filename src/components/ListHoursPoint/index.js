import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Theme
import { theme } from '../../global/styles/theme';

// Functions
import { alternateName } from '../../functions/alternateName';
import { formatTime } from '../../functions/formatTime';

// Styles
import { 
    Container, 
    ViewName, 
    TextName, 
    TextHour 
} from './style';

export function ListHoursPoint({ name, hour, done }){

    const theme = useTheme(theme);

    return(
        <Container>
            <ViewName>
                <AntDesign name="clock-circle" size={18} color={done ? theme.colors.blue : theme.colors.text } />
                <TextName>{alternateName(name)}</TextName>
            </ViewName>
            <TextHour>{formatTime(hour)}</TextHour>
        </Container>
    )
}