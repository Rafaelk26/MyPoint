import { useEffect, useState, useCallback } from 'react';

// Components
import { ContainerLayout } from '../../components/Container';
import DocPDF from '../../components/DocPDF';

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

  const [loading, setLoading] = useState(true);
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
        data={
          [
            {
              id: '1',
              date: '01/08/2026',
              workedHours: '08:32',
              status: 'Concluído',
              createdAt: '2026-08-01T17:35:12.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:00',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:32',
              },
              pdf: {
                name: 'Ponto_01-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/1.pdf',
                fileSize: '42 KB',
              },
            },
            {
              id: '2',
              date: '02/08/2026',
              workedHours: '08:41',
              status: 'Concluído',
              createdAt: '2026-08-02T17:43:18.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:04',
                lunchStart: '12:01',
                lunchEnd: '13:00',
                exit: '17:45',
              },
              pdf: {
                name: 'Ponto_02-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/2.pdf',
                fileSize: '43 KB',
              },
            },
            {
              id: '3',
              date: '03/08/2026',
              workedHours: '08:15',
              status: 'Concluído',
              createdAt: '2026-08-03T17:18:42.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:06',
                lunchStart: '12:00',
                lunchEnd: '13:02',
                exit: '17:21',
              },
              pdf: {
                name: 'Ponto_03-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/3.pdf',
                fileSize: '41 KB',
              },
            },
            {
              id: '4',
              date: '04/08/2026',
              workedHours: '08:28',
              status: 'Concluído',
              createdAt: '2026-08-04T17:31:55.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:58',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:26',
              },
              pdf: {
                name: 'Ponto_04-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/4.pdf',
                fileSize: '44 KB',
              },
            },
            {
              id: '5',
              date: '05/08/2026',
              workedHours: '08:05',
              status: 'Concluído',
              createdAt: '2026-08-05T17:08:20.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:10',
                lunchStart: '12:05',
                lunchEnd: '13:05',
                exit: '17:15',
              },
              pdf: {
                name: 'Ponto_05-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/5.pdf',
                fileSize: '42 KB',
              },
            },
            {
              id: '6',
              date: '06/08/2026',
              workedHours: '08:46',
              status: 'Concluído',
              createdAt: '2026-08-06T17:48:30.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:56',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:42',
              },
              pdf: {
                name: 'Ponto_06-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/6.pdf',
                fileSize: '45 KB',
              },
            },
            {
              id: '7',
              date: '07/08/2026',
              workedHours: '08:18',
              status: 'Concluído',
              createdAt: '2026-08-07T17:20:15.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:03',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:21',
              },
              pdf: {
                name: 'Ponto_07-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/7.pdf',
                fileSize: '43 KB',
              },
            },
            {
              id: '8',
              date: '08/08/2026',
              workedHours: '08:37',
              status: 'Concluído',
              createdAt: '2026-08-08T17:39:51.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:59',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:36',
              },
              pdf: {
                name: 'Ponto_08-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/8.pdf',
                fileSize: '44 KB',
              },
            },
            {
              id: '9',
              date: '09/08/2026',
              workedHours: '08:12',
              status: 'Concluído',
              createdAt: '2026-08-09T17:15:10.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:01',
                lunchStart: '12:02',
                lunchEnd: '13:00',
                exit: '17:13',
              },
              pdf: {
                name: 'Ponto_09-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/9.pdf',
                fileSize: '42 KB',
              },
            },
            {
              id: '10',
              date: '10/08/2026',
              workedHours: '08:29',
              status: 'Concluído',
              createdAt: '2026-08-10T17:30:40.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:00',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:29',
              },
              pdf: {
                name: 'Ponto_10-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/10.pdf',
                fileSize: '43 KB',
              },
            },
            {
              id: '11',
              date: '11/08/2026',
              workedHours: '08:11',
              status: 'Concluído',
              createdAt: '2026-08-11T17:12:18.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:02',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:13',
              },
              pdf: {
                name: 'Ponto_11-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/11.pdf',
                fileSize: '42 KB',
              },
            },
            {
              id: '12',
              date: '12/08/2026',
              workedHours: '08:34',
              status: 'Concluído',
              createdAt: '2026-08-12T17:35:27.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:58',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:32',
              },
              pdf: {
                name: 'Ponto_12-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/12.pdf',
                fileSize: '44 KB',
              },
            },
            {
              id: '13',
              date: '13/08/2026',
              workedHours: '08:22',
              status: 'Concluído',
              createdAt: '2026-08-13T17:23:08.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:05',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:27',
              },
              pdf: {
                name: 'Ponto_13-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/13.pdf',
                fileSize: '41 KB',
              },
            },
            {
              id: '14',
              date: '14/08/2026',
              workedHours: '08:49',
              status: 'Concluído',
              createdAt: '2026-08-14T17:51:10.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:54',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:43',
              },
              pdf: {
                name: 'Ponto_14-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/14.pdf',
                fileSize: '46 KB',
              },
            },
            {
              id: '15',
              date: '15/08/2026',
              workedHours: '08:17',
              status: 'Concluído',
              createdAt: '2026-08-15T17:18:50.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:01',
                lunchStart: '12:02',
                lunchEnd: '13:01',
                exit: '17:18',
              },
              pdf: {
                name: 'Ponto_15-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/15.pdf',
                fileSize: '42 KB',
              },
            },
            {
              id: '16',
              date: '16/08/2026',
              workedHours: '08:39',
              status: 'Concluído',
              createdAt: '2026-08-16T17:40:33.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:57',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:36',
              },
              pdf: {
                name: 'Ponto_16-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/16.pdf',
                fileSize: '45 KB',
              },
            },
            {
              id: '17',
              date: '17/08/2026',
              workedHours: '08:26',
              status: 'Concluído',
              createdAt: '2026-08-17T17:28:41.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:04',
                lunchStart: '12:01',
                lunchEnd: '13:00',
                exit: '17:30',
              },
              pdf: {
                name: 'Ponto_17-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/17.pdf',
                fileSize: '43 KB',
              },
            },
            {
              id: '18',
              date: '18/08/2026',
              workedHours: '08:08',
              status: 'Concluído',
              createdAt: '2026-08-18T17:10:12.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:06',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:14',
              },
              pdf: {
                name: 'Ponto_18-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/18.pdf',
                fileSize: '40 KB',
              },
            },
            {
              id: '19',
              date: '19/08/2026',
              workedHours: '08:43',
              status: 'Concluído',
              createdAt: '2026-08-19T17:45:28.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '07:56',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:39',
              },
              pdf: {
                name: 'Ponto_19-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/19.pdf',
                fileSize: '44 KB',
              },
            },
            {
              id: '20',
              date: '20/08/2026',
              workedHours: '08:31',
              status: 'Concluído',
              createdAt: '2026-08-20T17:33:05.000Z',
              employee: {
                id: 'emp_001',
                name: 'Rafael Kikuchi',
              },
              company: {
                id: 'comp_001',
                name: 'MyPoint Tecnologia',
              },
              points: {
                entry: '08:00',
                lunchStart: '12:00',
                lunchEnd: '13:00',
                exit: '17:31',
              },
              pdf: {
                name: 'Ponto_20-08-2026.pdf',
                url: 'https://api.mypoint.com/pdfs/20.pdf',
                fileSize: '42 KB',
              },
            },
          ]
        }
        keyExtractor={item=> String(item.id)}
        renderItem={renderItemsPdf}
        />
      </ContainerLayout>
    </Screen>
    
  );
}