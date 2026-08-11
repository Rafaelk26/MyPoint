import { useNavigation } from '@react-navigation/native';

// Components
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextFooter } from '../../components/FooterText';

// Styles
import { 
  Container, 
  ContainerTitle, 
  Title, 
  Subtitle, 
  ContainerForms,
  LinkText
} from './style';

export default function ForgotPassword() {

  const navigation = useNavigation();

 return (
   <Container>
      {/* Logo */}
      <Logo />

      {/* Container Title Page */}
      <ContainerTitle>
        <Title>Recuperação de Senha</Title>
        <Subtitle>Insira seu email para recuperação e alteração de sua senha.</Subtitle>
      </ContainerTitle>

      {/* Container Forms */}
      <ContainerForms>
        <Input />
        {/* <Input placeholder="Email" type="default" /> */}
        <ButtonSubmit title="Enviar Email" />
        <LinkText onPress={() => navigation.goBack()}>
          Retornar ao Login
        </LinkText>
      </ContainerForms>

      {/* Footer Text */}
      <TextFooter />
   </Container>
  );
}