import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const Overlay = styled.Pressable`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.35);
`;

export const Content = styled.View`
    background: white;
    padding: 24px;
    border-top-left-radius: 26px;
    border-top-right-radius: 26px;
`;

export const Header = styled.View`
    width: 60px;
    height: 5px;
    border-radius: 3px;
    background: #d5d5d5;
    align-self: center;
    margin-bottom: 20px;
`;

export const ButtonAction = styled.TouchableOpacity`
    padding: 16px 0;
`;

export const TextAction = styled.Text`
    font-size: 17px;
    font-family: ${({theme})=>theme.fonts.regular};
    color: ${({theme})=>theme.colors.text};
`;

export const Divider = styled.View`
    height: 1px;
    background: #ececec;
`;