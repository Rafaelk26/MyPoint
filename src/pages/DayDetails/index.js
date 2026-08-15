import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Components
import { ContainerLayout } from '../../components/Container';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { ListHoursPoint } from '../../components/ListHoursPoint';
import { ListExtraTime } from '../../components/ListExtraTime';

// Functions
import { formatDateToBrazil } from '../../functions/formatDateToBrazil';

// Hooks
import { Screen } from '../../hooks/Screen';

// Styles
import { 
  ContainerDetails,
  ViewButtonBack,
  ViewTitleDetails,
  TitleDetails,
  DateDetails,
  DayWeekDetails,
  ContainerInfoHourPoint,
  ListInfoPoint,
  ContainerExtraTimePoint,
  ListInfoExtraTime,
  ViewButtonPosition,
} from './style';

export default function DayDetails() {
  
  // Route for data collect
  const route = useRoute();
  const { data } = route.params;
  const nav = useNavigation();

  // States
  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState([]);
  const [times, setTimes] = useState([
    {name: 'Horas trabalhadas', time: data.worked_hours},
    {name: 'Horas extras', time: data.extra_hours},
    {name: 'Saldo do dia', time: data.balance},
  ]);

  useEffect(()=>{
    async function load(){
        setLoading(true);
        await new Promise(resolve=>setTimeout(resolve,1000));
        setLoading(false);
    }

    load();
  }, []);

  useEffect(()=> {
    const dataReq = data.time_points;
    const dataRes = dataReq.map(item=> ({
      ...item,
      done: item.time ? true : false,
    }));
    setStops(dataRes);
  }, []);

 return (
    <Screen 
    loading={loading} 
    onUnmount={()=> { 
      setStops([]); 
      setTimes([]); 
    }}>
      <ContainerLayout>
        {/* Container title and button back page */}
        <ContainerDetails>
          <ViewButtonBack onPress={()=> nav.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={30} color="black" />
          </ViewButtonBack>

          <ViewTitleDetails>
            <TitleDetails>Detalhes do Dia</TitleDetails>
            <DateDetails>{formatDateToBrazil(data.date)}</DateDetails>
          </ViewTitleDetails>
        </ContainerDetails>
        
        {/* Info hour data */}
        <ContainerInfoHourPoint>
          <ListInfoPoint
          data={stops}
          keyExtractor={item=> String(item.id)}
          renderItem={({ item })=> (
            <ListHoursPoint name={item.type} hour={item.time} done={item.done} />
          )}
          />
        </ContainerInfoHourPoint>

        {/* Extra hour data */}
        <ContainerExtraTimePoint>
          <ListInfoExtraTime
          data={times}
          keyExtractor={item=> String(item.name)}
          renderItem={({ item })=> (
            <ListExtraTime name={item.name} hour={item.time} />
          )}
          />
        </ContainerExtraTimePoint>

        {/* Button Gerate PDF */}
        <ViewButtonPosition>
          <ButtonSubmit title={'Gerar PDF'}>
            <AntDesign name="file-pdf" size={24} color="#fff" />
          </ButtonSubmit>
        </ViewButtonPosition>
    </ContainerLayout>
    </Screen>
  );
}