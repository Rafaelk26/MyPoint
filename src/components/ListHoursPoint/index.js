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

export function ListHoursPoint({ name, hour, done }){

    const theme = useTheme(theme);
    const names = ['Entrada', 'Almoço (Ida)', 'Almoço (Volta)', 'Saída'];
    
    function formatTime(time) {
        if (!time) {
        return '--:--';
        }

        return time.slice(0, 5);
    }
    
    function alternateName(type){
        if(type === 'entry' || type === "Entrada"){
            return names[0];
        }
        else if(type === 'lunch_start' || type === "Almoço (Ida)"){
            return names[1];
        }
        else if(type === 'lunch_end' || type === "Almoço (Volta)"){
            return names[2];
        }
        else {
            return names[3];
        }
    }

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