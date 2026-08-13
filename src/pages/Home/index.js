import { useEffect, useState, useContext } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Components
import { ContainerLayout } from '../../components/Container';
import { AnalogClock } from '../../components/Clock';
import { ListHoursPoint } from '../../components/ListHoursPoint';
import { ButtonSubmit } from '../../components/ButtonSubmit';

// Functions
import { getTodayWorkDay } from '../../functions/getTodayWorkDay';
import { findPointsToday } from '../../functions/findPointsToday';

// Hooks
import { Screen } from '../../hooks/Screen';

// Contexts
import { UserContext } from '../../context/userContext';

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
import Toast from 'react-native-toast-message';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [pointLoading, setPointLoading] = useState(false);
  const { user, registerPoint, updateUserPoints } = useContext(UserContext);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('--:--:--');
  const [currentStep, setCurrentStep] = useState(0);
  const [workDay, setWorkDay] = useState(null);
  const phrases = [
    'Entrada',
    'Almoço (Ida)',
    'Almoço (Volta)',
    'Saída',
  ];
  const stops = user?.point ?? [];

  // Use theme
  const theme = useTheme(theme);

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

  function formatTime(time) {
    if (!time) {
      return '--:--';
    }

    return time.slice(0, 5);
  }

  function formatPoints(points) {
    const stops = [
      {
        name: 'Entrada',
        hour: '--:--',
        done: false,
      },
      {
        name: 'Almoço (Ida)',
        hour: '--:--',
        done: false,
      },
      {
        name: 'Almoço (Volta)',
        hour: '--:--',
        done: false,
      },
      {
        name: 'Saída',
        hour: '--:--',
        done: false,
      },
    ];

    points.forEach(point => {
      const formattedTime = formatTime(point.time);

      if (point.type === 'entry') {
        stops[0].hour = formattedTime;
        stops[0].done = true;
      }

      if (point.type === 'lunch_start') {
        stops[1].hour = formattedTime;
        stops[1].done = true;
      }

      if (point.type === 'lunch_end') {
        stops[2].hour = formattedTime;
        stops[2].done = true;
      }

      if (point.type === 'exit') {
        stops[3].hour = formattedTime;
        stops[3].done = true;
      }
    });

    return stops;
  }

  function formatInterval(interval) {
    if (!interval) {
      return '00h 00min';
    }

    const match = interval.match(/(-?)(\d+):(\d+):(\d+)/);

    if (!match) {
      return '00h 00min';
    }

    const sign = match[1] === '-' ? '-' : '';
    const hours = match[2];
    const minutes = match[3];

    return `${sign}${hours}h ${minutes}min`;
  }

  // Send point for back-end and change phrase in the button
  async function handlePoint() {
    if (!user?.id) {
      return;
    }

    if (workDay?.status === 'completed') {
      Toast.show({
        type: 'info',
        text1: 'Dia já finalizado',
        text2: 'Você já registrou sua saída hoje.',
      });

      return;
    }

    try {
      setPointLoading(true);
      
      Toast.show({
        type: 'info',
        text1: `Registrando...`,
      });

      const nextStop = stops.find(item => !item.done);

      if (!nextStop) {
        return;
      }

      const now = new Date();

      const hourRegister =
        `${String(now.getHours()).padStart(2, '0')}:` +
        `${String(now.getMinutes()).padStart(2, '0')}`;

      const pointTypes = {
        'Entrada': 'entry',
        'Almoço (Ida)': 'lunch_start',
        'Almoço (Volta)': 'lunch_end',
        'Saída': 'exit',
      };

      const type = pointTypes[nextStop.name];

      if (!type) {
        return;
      }

      // Busca o dia de trabalho do funcionário
      const workDay = await getTodayWorkDay(user.id);

      // Registra no banco
      const result = await registerPoint({
        employeeId: user.id,
        workDayId: workDay.id,
        type,
        time: hourRegister,
      });

      if (result.workDay) {
        setWorkDay(result.workDay);
      }

      // Atualiza os pontos localmente
      const updatedPoints = stops.map(item =>
        item.name === nextStop.name
          ? {
              ...item,
              hour: hourRegister,
              done: true,
            }
          : item
      );

      // Atualiza contexto
      updateUserPoints(updatedPoints);

      const nextIndex = updatedPoints.findIndex(
        item => !item.done
      );

      if (nextIndex !== -1) {
        setCurrentStep(nextIndex);
      }

      Toast.show({
        type: 'success',
        text1: `Ponto Registrado!`,
      });

    } catch (error) {
      console.log('Erro ao registrar ponto:', error);
        Toast.show({
          type: 'error',
          text1: `Erro ao registrar ponto!`,
        });
    } finally {
      setPointLoading(false);
    }
  }

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

  useEffect(() => {
    async function loadTodayPoints() {
      if (!user?.id) return;

      try {
        setLoading(true);

        // Busca o dia de trabalho
        const todayWorkDay = await getTodayWorkDay(user.id);

        // Guarda no estado
        setWorkDay(todayWorkDay);

        // Busca os pontos
        const points = await findPointsToday(todayWorkDay.id);

        // Formata
        const formattedPoints = formatPoints(points);

        // Atualiza contexto
        updateUserPoints(formattedPoints);

        // Próximo ponto
        const nextIndex = formattedPoints.findIndex(
          item => !item.done
        );

        if (todayWorkDay.status === 'completed') {
          setCurrentStep(-1);
        } else {
          const nextIndex = formattedPoints.findIndex(
            item => !item.done
          );

          setCurrentStep(
            nextIndex === -1 ? -1 : nextIndex
          );
        }

      } catch (error) {
        console.log(
          'Erro ao carregar pontos de hoje:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadTodayPoints();

  }, [user?.id]);

 return (
    <Screen loading={loading}>
      <ContainerLayout>
        {/* Title Info */}
        <ContainerInfo>
          <TitleInfo>{getGreeting()}</TitleInfo>
          <NameInfo>{user.name}</NameInfo>
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
          data={user?.point ?? []}
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
            <TextInfoHour>
              {formatInterval(workDay?.worked_hours)}
            </TextInfoHour>
          </ViewInfoHour>

          <ViewInfoHour>
            <TextInfoTitle>Horas extras</TextInfoTitle>
            <TextInfoHour>
              {formatInterval(workDay?.extra_hours)}
            </TextInfoHour>
          </ViewInfoHour>
        </ContainerTimeWorked>

        {/* Button Submit */}
        <ButtonSubmit 
         title={'Bater Ponto'} 
         subtitle={
            workDay?.status === 'completed'
              ? 'Jornada finalizada'
              : `Próximo registro: ${phrases[currentStep]}`
          }
         onPress={handlePoint}
         loading={pointLoading}
         disabled={workDay?.status === 'completed'}>
          <Ionicons name="finger-print" size={32} color="#fff" />
        </ButtonSubmit>
      </ContainerLayout>
    </Screen>
  );
}