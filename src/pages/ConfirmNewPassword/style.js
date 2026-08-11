import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const ContainerTitle = styled.View`
  width: 65%;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: center;
  margin-top: 40px;
  font-size: 40px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Subtitle = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ContainerForms = styled.View`
  margin-top: 40px;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;