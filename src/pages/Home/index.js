import { useEffect, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Components
import { ContainerLayout } from '../../components/Container';
import { AnalogClock } from '../../components/Clock';
import { ListHoursPoint } from '../../components/ListHoursPoint';
import { ButtonSubmit } from '../../components/ButtonSubmit';

// Hooks
import { Screen } from '../../hooks/Screen';

// Theme
import { theme } from '../../global/styles/theme';

// Styles
import { 
  ContainerInfo, 
  TitleInfo, 
  NameInfo, 
  DateInfo,
  ContainerInfoTime,
  ViewTime,
  TimeInfoText,
  TimeText,
  ViewClock,
  ContainerStatusWork,
  ContainerStatus,
  NameStatus,
  ContainerPointDairyTable,
  FlatListPoint,
  ContainerTimeWorked,
  ViewInfoHour,
  TextInfoHour,
  TextInfoTitle,
} from './style';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('--:--:--');
  const [currentStep, setCurrentStep] = useState(0);
  const phrases = [
    'Entrada',
    'Almoço (Ida)',
    'Almoço (Volta)',
    'Saída',
  ];
  const [stops, setStops] = useState([
    { name: 'Entrada', hour: '--:--', done: false },
    { name: 'Almoço (Ida)', hour: '--:--', done: false },
    { name: 'Almoço (Volta)', hour: '--:--', done: false },
    { name: 'Saída', hour: '--:--', done: false },
  ]);

  // Use theme
  const theme = useTheme(theme);

  // Get Date and Hour
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Get Hour
      setHour(
        now.toLocaleTimeString('pt-BR', {
          hour12: false,
        })
      );

      // Get Date
      setDate(
        now.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        })
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Performance aplication
  useEffect(()=>{
    async function load(){
        setLoading(true);
        await new Promise(resolve=>setTimeout(resolve,1000));
        setLoading(false);
    }

    load();
  }, []);

  // Get hour and decide greeting
  function getGreeting(){
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'Bom dia,';
    }

    if (hour < 18) {
      return 'Boa tarde,';
    }

    return 'Boa noite,';
  }

  function handleChangeStatus() {
    const doneStop = [...stops].reverse().find(item => item.done);

    if (!doneStop) {
      return 'Iniciar expediente';
    }

    const status = {
      'Entrada': 'Trabalhando',
      'Almoço (Ida)': 'Almoçando',
      'Almoço (Volta)': 'Trabalhando',
      'Saída': 'Dia finalizado',
    };

    return status[doneStop.name];
  }

  // Send point for back-end and change phrase in the button
  function handlePoint() {
    const getTime = new Date();
    const hourRegister = getTime.getHours();
    const minutesRegister = getTime.getMinutes();
    const secondsRegister = getTime.getSeconds();
    
    const nextStop = stops.find(item => !item.done);
    
    if(nextStop.name === "Entrada"){
      stops[0].hour = `${hourRegister}:${minutesRegister < '10' ? `0${minutesRegister}` : minutesRegister}`;
      stops[0].done = true;

    }
    else if(nextStop.name === "Almoço (Ida)"){
      stops[1].hour = `${hourRegister}:${minutesRegister < '10' ? `0${minutesRegister}` : minutesRegister}`;
      stops[1].done = true;
    }
    else if(nextStop.name === "Almoço (Volta)"){
      stops[2].hour = `${hourRegister}:${minutesRegister < '10' ? `0${minutesRegister}` : minutesRegister}`;
      stops[2].done = true;
    }
    else {
      stops[3].hour = `${hourRegister}:${minutesRegister < '10' ? `0${minutesRegister}` : minutesRegister}`;
      stops[3].done = true;
    }

    if (currentStep < phrases.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  }

 return (
    <Screen loading={loading}>
      <ContainerLayout>
        {/* Title Info */}
        <ContainerInfo>
          <TitleInfo>{getGreeting()}</TitleInfo>
          <NameInfo>Rafael Kikuchi</NameInfo>
          <DateInfo>{date}</DateInfo>
        </ContainerInfo>

        {/* Clock and Hours */}
        <ContainerInfoTime>
          <ViewTime>
            <TimeInfoText>Horário Atual</TimeInfoText>
            <TimeText>{hour}</TimeText>
          </ViewTime>

          <ViewClock>
            <AnalogClock />
          </ViewClock>
        </ContainerInfoTime>

        {/* Status Work Title */}
        <ContainerStatusWork>
          <TitleInfo>Status Atual</TitleInfo>
          <ContainerStatus>
            <FontAwesome name="circle" size={12} color={theme.colors.blue} />
            <NameStatus>{handleChangeStatus()}</NameStatus>
          </ContainerStatus>
        </ContainerStatusWork>

        {/* Point Word Table */}
        <ContainerPointDairyTable>
          <FlatListPoint 
          data={stops}
          keyExtractor={item => item.name}
          renderItem={({ item })=> (
            <ListHoursPoint name={item.name} hour={item.hour} done={item.done} />
          )}
          />
        </ContainerPointDairyTable>

        {/* Quantity hours worked */}
        <ContainerTimeWorked>
          <ViewInfoHour>
            <TextInfoTitle>Horas trabalhadas</TextInfoTitle>
            <TextInfoHour>00h 00min</TextInfoHour>
          </ViewInfoHour>

          <ViewInfoHour>
            <TextInfoTitle>Horas extras</TextInfoTitle>
            <TextInfoHour>00h 00min</TextInfoHour>
          </ViewInfoHour>
        </ContainerTimeWorked>

        {/* Button Submit */}
        <ButtonSubmit 
         title={'Bater Ponto'} 
         subtitle={`Próximo registro: ${phrases[currentStep]}`}
         onPress={handlePoint}>
          <Ionicons name="finger-print" size={32} color="#fff" />
        </ButtonSubmit>
      </ContainerLayout>
    </Screen>
  );
}