import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Components
import { ContainerLayout } from '../../components/Container';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { ListHoursPoint } from '../../components/ListHoursPoint';
import { ListExtraTime } from '../../components/ListExtraTime';

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
  const [stops, setStops] = useState([
    { name: 'Entrada', hour: '07:48', done: true },
    { name: 'Almoço (Ida)', hour: '13:07', done: true },
    { name: 'Almoço (Volta)', hour: '14:15', done: true },
    { name: 'Saída', hour: '17:56', done: true },
  ]);
  const [times, setTimes] = useState([
    {name: 'Horas trabalhadas', time: '00:00'},
    {name: 'Horas extras', time: '00:00'},
    {name: 'Carga horária do dia', time: '00:00'},
    {name: 'Saldo do dia', time: '00:00'},
  ]);

  useEffect(()=>{
    async function load(){
        setLoading(true);
        await new Promise(resolve=>setTimeout(resolve,1000));
        setLoading(false);
    }

    load();
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
            <DateDetails>{data.date}</DateDetails>
          </ViewTitleDetails>
        </ContainerDetails>
        
        {/* Info hour data */}
        <ContainerInfoHourPoint>
          <ListInfoPoint
          data={stops}
          keyExtractor={item=> String(item.name)}
          renderItem={({ item })=> (
            <ListHoursPoint name={item.name} hour={item.hour} done={item.done} />
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