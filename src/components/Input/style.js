import styled from 'styled-components/native';

export const InputView = styled.TextInput`
    border: 1px solid #CACACA;
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;