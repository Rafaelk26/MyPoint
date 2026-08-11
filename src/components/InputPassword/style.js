import styled from 'styled-components/native';


export const ContainerInput = styled.View`
    width: 100%;
`;

export const InputView = styled.TextInput`
    border: 1px solid #CACACA;
    border-radius: 10px;
    width: 100%;
    padding: 14px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const IconView = styled.View`
    width: 30px;
    height: 30px;    
`;

export const IconButton = styled.TouchableOpacity`
    position: absolute;
    top: 16px;
    right: 20px;
`;