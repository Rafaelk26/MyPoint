import { useEffect, useMemo, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { Picker } from '@react-native-picker/picker';

// Components
import { ContainerLayout } from '../../components/Container';
import { PDFActionsModal } from '../../components/PDFActionsModal';
import { PDF } from '../../components/PDF';

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
} from './style';

export default function Docs() {

  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('jan');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdf, setPdf] = useState(
    [{id: 1, name: "30/07/2026.pdf", size: "94 KB"},]
  );

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
        {/* Title page */}
        <TitleDocs>Documentos</TitleDocs>

        {/* Filter Month */}
        <ContainerFilterMonth>
          <ViewIcon>
            <FontAwesome5 name="calendar" size={24} color={theme.colors.blue} />
          </ViewIcon>
          
          <ViewSelect>
            <Picker
            style={{ marginTop: 0, fontSize: theme.fonts.bold }}
            selectedValue={value}
            onValueChange={(value)=> setValue(value)}
            >
              <Picker.Item key={1} label={'Janeiro de 2026'} value={'jan'} />
              <Picker.Item key={1} label={'Fevereiro de 2026'} value={'fev'} />
              <Picker.Item key={1} label={'Março de 2026'} value={'mar'} />
              <Picker.Item key={1} label={'Abril de 2026'} value={'abr'} />
              <Picker.Item key={1} label={'Maio de 2026'} value={'mai'} />
              <Picker.Item key={1} label={'Junho de 2026'} value={'jun'} />
              <Picker.Item key={1} label={'Julho de 2026'} value={'jul'} />
              <Picker.Item key={1} label={'Agosto de 2026'} value={'ago'} />
              <Picker.Item key={1} label={'Setembro de 2026'} value={'set'} />
              <Picker.Item key={1} label={'Outubro de 2026'} value={'out'} />
              <Picker.Item key={1} label={'Novembro de 2026'} value={'nov'} />
              <Picker.Item key={1} label={'Dezembro de 2026'} value={'dez'} />
            </Picker>
          </ViewSelect>
        </ContainerFilterMonth> 

        {/* Flatlist with render component PDF */}
        <ListPDF 
        data={pdf}
        keyExtractor={item => String(item.id)}
        renderItem={({ item })=> (
          <PDF 
          data={item} 
          onMore={() => {
            setSelectedPDF(item);
            setModalVisible(true);
          }} />
        )}
        />
        {/* Menu show modal for each PDF selected */}
        <PDFActionsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpen={() => console.log(selectedPDF)}
          onDownload={() => {}}
          onDelete={() => {}}
        />
      </ContainerLayout>
    </Screen>
  );
}