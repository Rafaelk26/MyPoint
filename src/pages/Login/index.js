import { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { ButtonSubmit } from '../../components/ButtonSubmit';
import { TextFooter } from '../../components/FooterText';

// Context
import { UserContext } from '../../context/userContext';

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
 const { getUser, signIn, authLoading } = useContext(UserContext);
 const [email, setEmail] = useState(null);
 const [password, setPassword] = useState(null);

 async function handleLoginPost(){  
   try{
    const response = await signIn(email, password);
    await getUser(response.user);
   }
   catch(err){
    console.log(`Não foi possível se logar: ${err}`);
   }
 }

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
      <ContainerForms
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Input 
         placeholder="Email"
         onChangeText={(text)=> setEmail(text)}
        />
        <InputPassword 
         onChangeText={(text)=> setPassword(text)}
         placeholder="Senha" 
        />
        <LinkText onPress={() => navigation.navigate('ForgotPassword')}>
          Esqueci minha senha
        </LinkText>
        <ButtonSubmit title="Entrar" onPress={handleLoginPost} loading={authLoading} />
      </ContainerForms>
      
      {/* Footer Text */}
      <TextFooter />
   </Container>
  );
}