import styled from 'styled-components/native';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const ContainerTitle = styled.View`
  width: 80%;
  align-items: center;
  justify-content: center;
`;

export const TitleLogin = styled.Text`
  margin-top: 40px;
  font-size: 40px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SubtitleLogin = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContainerForms = styled.KeyboardAvoidingView`
  margin-top: 40px;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const LinkText = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: underline;
`;