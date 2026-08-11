import styled from "styled-components/native";

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.semi};
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

export const ViewInfo = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-style: solid;
  border-radius: 16px;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 40px;
  gap: 16px;
`;

export const TitleInfo = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.semi};
`;

export const ViewLogoutButton = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;