import styled from 'styled-components/native';

export const InputView = styled.TextInput`
  border-width: 1px;
  border-color: #CACACA;
  border-radius: 10px;
  width: 100%;
  padding: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #000;
`;