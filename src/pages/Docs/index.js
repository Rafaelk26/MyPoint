import { useEffect, useMemo, useState, useContext } from 'react';
import Toast from 'react-native-toast-message';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Picker } from '@react-native-picker/picker';
import { Text } from 'react-native';

// Components
import { ContainerLayout } from '../../components/Container';
import { PDFActionsModal } from '../../components/PDFActionsModal';
import { PDF } from '../../components/PDF';

// Functions
import { getWorkDayPDFs } from '../../functions/pdf/getWorkDayPDFs';
import { deleteWorkDayPDF } from '../../functions/pdf/deleteWorkDayPDF';
import { downloadWorkDayPDF } from '../../functions/pdf/downloadWorkDayPDF';

// Context
import { UserContext } from '../../context/userContext';

// Hooks
import { Screen } from '../../hooks/Screen';

// Styles
import { 
  Container, 
  TitleDocs,
  ContainerFilterMonth,
  ViewIcon,
  ViewSelect,
  ListPDF,
  TextNotFound
} from './style';

export default function Docs() {

  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('01');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdf, setPdf] = useState([]);

  const filteredPDFs = useMemo(() => {
    return pdf.filter(item => item.month === value);
  }, [pdf, value]);

  useEffect(() => {
    async function loadPDFs() {

      if(!user?.id){
        setLoading(false);
        return;
      }

      try{
        setLoading(true);
        const data = await getWorkDayPDFs(user.id);
        const formattedPDFs = data.map(item => ({
          id: item.id,
          name: item.file_name,
          size: item.file_size
            ? `${(item.file_size / 1024).toFixed(0)} KB`
            : '--',
          month: item.file_name.slice(3,5),
          storagePath: item.storage_path,
          workDayId: item.work_day_id,
        }));

        setPdf(formattedPDFs);

      } 
      catch(error){
        console.log('Erro ao carregar PDFs:', error);
      } 
      finally{
        setLoading(false);
      }
    }
    loadPDFs();
  }, [user?.id]);

 return (
    <Screen loading={loading}>
      <ContainerLayout>
        {/* Title page */}
        <TitleDocs>Documentos</TitleDocs>

        {/* Filter Month */}
        <ContainerFilterMonth>
          <ViewIcon>
            <FontAwesome5 name="calendar" size={24} color={theme.colors.blue} />
          </ViewIcon>
          
          <ViewSelect>
            <Picker
            style={{ marginTop: 0, fontSize: theme.fonts.bold, color: '#000' }}
            selectedValue={value}
            onValueChange={(value)=> setValue(value)}
            >
              <Picker.Item key={'01'} label={'Janeiro de 2026'} value={'01'} />
              <Picker.Item key={'02'} label={'Fevereiro de 2026'} value={'02'} />
              <Picker.Item key={'03'} label={'Março de 2026'} value={'03'} />
              <Picker.Item key={'04'} label={'Abril de 2026'} value={'04'} />
              <Picker.Item key={'05'} label={'Maio de 2026'} value={'05'} />
              <Picker.Item key={'06'} label={'Junho de 2026'} value={'06'} />
              <Picker.Item key={'07'} label={'Julho de 2026'} value={'07'} />
              <Picker.Item key={'08'} label={'Agosto de 2026'} value={'08'} />
              <Picker.Item key={'09'} label={'Setembro de 2026'} value={'09'} />
              <Picker.Item key={'10'} label={'Outubro de 2026'} value={'10'} />
              <Picker.Item key={'11'} label={'Novembro de 2026'} value={'11'} />
              <Picker.Item key={'12'} label={'Dezembro de 2026'} value={'12'} />
            </Picker>
          </ViewSelect>
        </ContainerFilterMonth> 

        {/* Flatlist with render component PDF */}
        {filteredPDFs.length > 0 ? (
          <ListPDF 
            data={filteredPDFs}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PDF 
                data={item} 
                onMore={() => {
                  setSelectedPDF(item);
                  setModalVisible(true);
                }} 
              />
            )}
          />
        ) : (
          <TextNotFound>
            Nenhum documento encontrado nesse mês
          </TextNotFound>
        )}
        {/* Menu show modal for each PDF selected */}
        <PDFActionsModal
          visible={modalVisible}
          onClose={ () => {setModalVisible(false) }}
          onDownload={async () => {
            try {
              await downloadWorkDayPDF(selectedPDF.storagePath, selectedPDF.name);
            } 
            catch(error){
              console.log('Erro ao baixar PDF:', error);
            }
          }}
          onDelete={async () => {
            try {
              await deleteWorkDayPDF({
                id: selectedPDF.id,
                storagePath: selectedPDF.storagePath,
              });

              setPdf(prev =>
                prev.filter(
                  item => item.id !== selectedPDF.id
                )
              );

              setModalVisible(false);

              Toast.show({
                type: 'success',
                text1: 'PDF excluído',
              });

            } 
            catch (error) {
              console.log('Erro ao excluir PDF:', error);

              Toast.show({
                type: 'error',
                text1: 'Erro ao excluir PDF',
              });

            }
          }}
        />
      </ContainerLayout>
    </Screen>
  );
}