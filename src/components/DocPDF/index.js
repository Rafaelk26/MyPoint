import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Styles
import { 
    Container, 
    ViewInfo, 
    ViewInfoII,
    ViewDateInfo, 
    TextDayDate, 
    TextDayName,
    TextDuration,
    ButtonOpenStackDoc,
} from './style';

function formatDateToBrazil(date) {
  if (!date) return '--/--/----';
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function DocPDF({ data }) {

const duration = `${data.worked_hours.slice(0,2)}h ${data.worked_hours.slice(3,5)}min`;

 // Use theme and navigation with native stack
 const theme = useTheme();
 const nav = useNavigation();

 return (
   <Container>
    <ViewInfo>
     <FontAwesome5 name='calendar' size={24} color={theme.colors.blue} />
     <ViewDateInfo>
        <TextDayDate>{formatDateToBrazil(data.date)}</TextDayDate>
        <TextDayName>{data.status === "completed" ? "Dia completo" : "Dia em andamento"}</TextDayName>
     </ViewDateInfo>
    </ViewInfo>
    
    <ViewInfoII>
        <TextDuration>{duration}</TextDuration>
        <ButtonOpenStackDoc onPress={()=> nav.navigate('DayDetails', {
            data
        })}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </ButtonOpenStackDoc>
    </ViewInfoII>
   </Container>
  );
}

export default memo(DocPDF);