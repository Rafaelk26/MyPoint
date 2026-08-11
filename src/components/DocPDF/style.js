import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 14px;
    border-width: 1px;
    border-color: ${({ theme })=> theme.colors.border};
    border-style: solid;
    border-radius: 20px;
    margin-bottom: 12px;
`;

export const ViewInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 48%;
`;

export const ViewInfoII = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 48%;
`;

export const ViewDateInfo = styled.View``;

export const TextDayDate = styled.Text`
    font-size: 18px;
    line-height: 20px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;

export const TextDayName = styled.Text`
    font-size: 10px;
    line-height: 12px;
    font-family: ${({ theme })=> theme.fonts.regular};
    color: ${({ theme })=> theme.colors.textSecondary};
`;

export const TextDuration = styled.Text`
    font-size: 14px;
    font-family: ${({ theme })=> theme.fonts.semi};
    color: ${({ theme })=> theme.colors.blue};
`;

export const ButtonOpenStackDoc = styled.TouchableOpacity`
    width: auto;
`;