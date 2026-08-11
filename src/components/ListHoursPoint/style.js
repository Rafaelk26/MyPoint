import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    border: .5px solid ${({ theme })=> theme.colors.border};
    padding: 14px 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ViewName = styled.View`
    flex-direction: row;
    gap: 6px;
    align-items: center;
`;

export const TextName = styled.Text`
    font-size: 14px;
    font-family: ${({ theme })=> theme.fonts.medium};
`;

export const TextHour = styled.Text`
    font-size: 16px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;