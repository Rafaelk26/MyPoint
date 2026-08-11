import styled from 'styled-components/native';

export const FooterText = styled.Text`
    position: absolute;
    bottom: 40px;
    font-size: 12px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
`;