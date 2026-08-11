import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Theme
import { theme } from '../../global/styles/theme';

// Styles
import { 
    Container, 
    ViewName, 
    TextName, 
    TextHour 
} from './style';

export function ListExtraTime({ name, hour }){

    const theme = useTheme(theme);
    
    //  Function that alterate text from '00:00' to '00h 00min'
    function alterateDuration(time){
        let firstPart = time.slice(0, 2);
        let secondPart = time.slice(3, 5);
        return (`${firstPart}h ${secondPart}min`);
    }

    return(
        <Container>
            <ViewName>
                <TextName>{name}</TextName>
            </ViewName>
            <TextHour>{alterateDuration(hour)}</TextHour>
        </Container>
    )
}