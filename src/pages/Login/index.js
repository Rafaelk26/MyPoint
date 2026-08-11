import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Components
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextFooter } from '../../components/FooterText';

// Styles
import { 
  Container, 
  ContainerTitle, 
  TitleLogin, 
  SubtitleLogin, 
  ContainerForms,
  LinkText
} from './style';

export default function Login() {

 const navigation = useNavigation();

 return (
   <Container>
      {/* Logo */}
      <Logo />
      
      {/* Container Title Page */}
      <ContainerTitle>
        <TitleLogin>Login</TitleLogin>
        <SubtitleLogin>Entre com seus acessos para registrar os seus pontos.</SubtitleLogin>
      </ContainerTitle>

      {/* Container Forms */}
      <ContainerForms>
        <Input placeholder="CPF" type="numeric" />
        <InputPassword placeholder="Senha" />
        <LinkText onPress={() => navigation.navigate('ForgotPassword')}>
          Esqueci minha senha
        </LinkText>
        <ButtonSubmit title="Entrar" />
      </ContainerForms>
      
      {/* Footer Text */}
      <TextFooter />
   </Container>
  );
}