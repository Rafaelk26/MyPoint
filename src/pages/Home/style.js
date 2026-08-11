import styled from 'styled-components/native';

export const ContainerInfo = styled.View`
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
`;

export const TitleInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const NameInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.text};
`;

export const DateInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContainerInfoTime = styled.View`
  background-color: #ffffffa1;
  padding: 10px 14px 10px 14px;
  margin-top: 30px;
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme })=> theme.colors.border};
  border-style: solid;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ViewTime = styled.View``;

export const TimeInfoText = styled.Text`
  font-family: ${({ theme })=> theme.fonts.regular};
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme })=> theme.colors.textSecondary};
`;

export const TimeText = styled.Text`
  font-family: ${({ theme })=> theme.fonts.semi};
  font-size: 40px;
  line-height: 42px;
  color: ${({ theme })=> theme.colors.text};
`;

export const ViewClock = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ContainerStatusWork = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

export const ContainerStatus = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const NameStatus = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semi};
  font-size: 20px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ContainerPointDairyTable = styled.View`
  margin-top: 10px;
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme })=> theme.colors.border};
  border-style: solid;
  border-radius: 10px;
  flex-direction: row;
`;

export const FlatListPoint = styled.FlatList`
  background-color: #ffffffa1;
  border-radius: 10px;
`;

export const ContainerTimeWorked = styled.View`
  margin-top: 30px;
  margin-bottom: 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ViewInfoHour = styled.View`
  width: 50%;
  border-radius: 10px;
  background-color: #ffffffa1;
  border-color: ${({ theme })=> theme.colors.border};
  border-style: solid;
  padding: 10px 14px 10px 14px;
`;

export const TextInfoTitle = styled.Text`
  font-size: 12px;
  font-family: ${({ theme })=> theme.fonts.regular};
  color: ${({ theme })=> theme.colors.textSecondary};
`;

export const TextInfoHour = styled.Text`
  font-size: 28px;
  font-family: ${({ theme })=> theme.fonts.semi};
  color: ${({ theme })=> theme.colors.text};
`;

