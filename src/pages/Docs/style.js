import styled from 'styled-components/native';

export const Container = styled.View``;

export const TitleDocs = styled.Text`
    font-size: 26px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;

export const ContainerFilterMonth = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

export const ViewIcon = styled.View``;

export const ViewSelect = styled.View`
    width: 50%;
`;

export const ListPDF = styled.FlatList`
    margin-top: 20px;
`;