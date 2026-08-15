import { useEffect, useState, useCallback, useContext } from 'react';

// Components
import { ContainerLayout } from '../../components/Container';
import DocPDF from '../../components/DocPDF';

// Functions 
import { getWorkedDay } from '../../functions/getWorkedDay';

// Context
import { UserContext } from '../../context/userContext';

// Hooks
import { Screen } from '../../hooks/Screen';

// Styles
import { 
  TitlePage, 
  ViewSelectPeriod, 
  ButtonOption, 
  TextOption,
  ListDocs,
} from './style';

export default function Historic() {

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [dataWork, setDataWork] = useState([]);
  // const [filter, setFilter] = useState('day');

  const renderItemsPdf = useCallback(({ item })=> {
    return <DocPDF data={item} />
  })

  useEffect(()=>{
    async function load(){
        setLoading(true);
        await new Promise(resolve=>setTimeout(resolve, 1000));
        setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function loadWorkedDay() {
      try {
        const data = await getWorkedDay(user.id);
        setDataWork(data);
      } catch (error) {
        console.log('Erro ao buscar jornada:', error);
      }
    }

    if (user?.id) {
      loadWorkedDay();
    }
  }, [user?.id]);


  return (
    <Screen loading={loading}>
      <ContainerLayout>
        <TitlePage>Histórico</TitlePage>

        {/* Filter Period */}
        {/* <ViewSelectPeriod>
          <ButtonOption
            activate={filter === 'day'}
            onPress={() => setFilter('day')}
          >
            <TextOption activate={filter === 'day'}>
              Dia
            </TextOption>
          </ButtonOption>

          <ButtonOption
            activate={filter === 'week'}
            onPress={() => setFilter('week')}
          >
            <TextOption activate={filter === 'week'}>
              Semana
            </TextOption>
          </ButtonOption>

          <ButtonOption
            activate={filter === 'month'}
            onPress={() => setFilter('month')}
          >
            <TextOption activate={filter === 'month'}>
              Mês
            </TextOption>
          </ButtonOption>
        </ViewSelectPeriod> */}

        {/* Flatlist docs with base on filter (day, week, month) */}
        <ListDocs 
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        showsVerticalScrollIndicator={false}
        data={dataWork}
        keyExtractor={item=> String(item.id)}
        renderItem={renderItemsPdf}
        />
      </ContainerLayout>
    </Screen>
    
  );
}