import styled from 'styled-components/native';

export const SubmitButton = styled.TouchableOpacity`
    width: 100%;
    padding: 20px 10px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 14px;
`;

export const ViewChildren = styled.View`
    width: auto;
    position: absolute;
    left: 40px;
`;

export const ViewTextsButton = styled.View`
`;

export const SubmitButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    line-height: 18px;
    font-family: ${({ theme }) => theme.fonts.semi};
    text-transform: uppercase;
    width: 100%;
    text-align: center;
`;

export const SubmitButtonSubtitle = styled.Text`
    font-size: 10px;
    line-height: 10px;
    color: #fff;
`;
