import styled from 'styled-components/native';

export const TitlePage = styled.Text`
    font-size: 26px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;

export const ViewSelectPeriod = styled.View`
    border-width: 1px;
    border-color: ${({ theme })=> theme.colors.border};
    border-style: solid;
    border-radius: 20px;
    flex-direction: row;
    justify-content: space-between;
    transition: all ease-in .4s;
`;

export const ButtonOption = styled.TouchableOpacity`
    transition: all ease-in .4s;
    background-color: ${props => props.activate ? ({ theme })=> theme.colors.blue : 'transparent'};
    padding: 10px;
    border-radius: 20px;
    width: 33%;
`;

export const TextOption = styled.Text`
    color: ${props => props.activate ? '#fff' : '#000'};
    font-size: 16px;
    text-align: center;
`;

export const ListDocs = styled.FlatList`
    margin-top: 20px;
`;