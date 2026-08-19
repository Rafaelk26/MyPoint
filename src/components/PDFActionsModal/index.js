import { Modal } from 'react-native';

// Style
import {
  Container,
  Overlay,
  Content,
  Header,
  ButtonAction,
  TextAction,
  Divider,
} from './style';

export function PDFActionsModal({
  visible,
  onClose,
  onDownload,
  onDelete,
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Container>

        <Overlay onPress={onClose} />
        
        <Content>
          <Header />

          <ButtonAction onPress={onDownload}>
            <TextAction>Baixar PDF</TextAction>
          </ButtonAction>

          <Divider />

          <ButtonAction onPress={onDelete}>
            <TextAction style={{ color: '#E53935' }}>
              Excluir PDF
            </TextAction>
          </ButtonAction>

          <Divider />

          <ButtonAction onPress={onClose}>
            <TextAction>Cancelar</TextAction>
          </ButtonAction>

        </Content>

      </Container>
    </Modal>
  );
}