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
  Title, 
  Subtitle, 
  ContainerForms,
} from './style';

export default function ConfirmNewPassword() {

 return (
    <Container>
      {/* Logo */}
      <Logo />
      
      {/* Container Title Page */}
      <ContainerTitle>
        <Title>Insira a sua nova senha</Title>
        <Subtitle>Insira a sua nova senha para atualizar e acessar sua conta.</Subtitle>
      </ContainerTitle>

      {/* Container Forms */}
      <ContainerForms>
        <InputPassword placeholder="Senha" />
        <InputPassword placeholder="Confirmar Senha" />
        <ButtonSubmit title="Alterar Senha" />
      </ContainerForms>
      
      {/* Footer Text */}
      <TextFooter />
    </Container>
  );
}