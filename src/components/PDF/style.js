import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 16px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    border-radius: 20px;
    margin-bottom: 12px;
    position: relative;
    overflow: visible;
`;

export const ViewInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const ViewIcon = styled.View``;

export const ViewInfoPDF = styled.View``;

export const TextTitlePDF = styled.Text`
    font-family: ${({ theme })=> theme.fonts.semi};
    font-size: 18px;
    line-height: 20px;
`;

export const TextSizePDF = styled.Text`
    font-family: ${({ theme })=> theme.fonts.regular};
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme })=> theme.colors.textSecondary};
`;

export const ButtonMoreActions = styled.TouchableOpacity``;