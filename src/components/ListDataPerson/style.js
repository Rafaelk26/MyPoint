import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: ${({ isLast }) => isLast ? '0px' : '0.5px'};
    border-color: ${({ theme }) => theme.colors.border};
    padding-top: 20px;
    padding-bottom: 12px;
`;

export const ViewInfo = styled.View`
    width: auto;
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;

export const TextInfo = styled.Text`
    font-size: 12px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;

export const ViewValue = styled.View`
    width: auto;
    justify-content: end;
`;

export const TextValue = styled.Text`
    font-size: 12px;
    font-family: ${({ theme })=> theme.fonts.regular};
    color: ${({ theme })=> theme.colors.textSecondary};
`;
