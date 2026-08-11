import styled from "styled-components/native";

export const Title = styled.Text`
    font-size: 24px;
    font-family: ${({theme})=> theme.fonts.semi};
    width: 100%;
    text-align: center;
    margin-top: 20px;
`;

export const ViewInfo = styled.View`
    border-width: 1px;
    border-color: ${({ theme })=> theme.colors.border};
    border-style: solid;
    border-radius: 16px;
    flex-direction: row;
    justify-content: space-between;
    transition: all ease-in .4s;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 40px;
    flex-direction: column;
    gap: 16px;
`;

export const TitleInfo = styled.Text`
    margin-top: 8px;
    font-size: 14px;
    font-family: ${({ theme })=> theme.fonts.semi}; 
`;

export const ListData = styled.FlatList``;