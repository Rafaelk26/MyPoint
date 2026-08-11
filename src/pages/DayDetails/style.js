import styled from 'styled-components/native';

export const ContainerDetails = styled.View`
    margin-top: 40px;
    flex-direction: row;
    justify-content: center;
`;

export const ViewButtonBack = styled.TouchableOpacity`
    position: absolute;
    z-index: 10;
    left: 0;
`;

export const ViewTitleDetails = styled.View`
    flex-direction: column;
    gap: 2px;
`;

export const TitleDetails = styled.Text`
    text-align: center;
    font-size: 24px;
    line-height: 26px;
    font-family: ${({ theme })=> theme.fonts.semi};
`;

export const DateDetails = styled.Text`
    text-align: center;
    font-size: 16px;
    line-height: 18px;
    font-family: ${({ theme })=> theme.fonts.regular}
`;

export const DayWeekDetails = styled.Text``;

export const ContainerInfoHourPoint = styled.View`
    margin-top: 30px;
    width: 100%;
    border-width: 1px;
    border-color: ${({ theme })=> theme.colors.border};
    border-style: solid;
    border-radius: 10px;
    flex-direction: row;
`;

export const ListInfoPoint = styled.FlatList``;

export const ContainerExtraTimePoint = styled.View`
    margin-top: 30px;
    width: 100%;
    border-width: 1px;
    border-color: ${({ theme })=> theme.colors.border};
    border-style: solid;
    border-radius: 10px;
    flex-direction: row;
`;

export const ListInfoExtraTime = styled.FlatList``;

export const ViewButtonPosition = styled.View`
    margin-top: 40px;
`;