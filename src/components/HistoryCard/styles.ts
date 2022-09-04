import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CardCategoryProps {
  color: string
}

export const Container = styled.View<CardCategoryProps>`
  margin-bottom: 8px;
  padding: 13px 24px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-left-width: 5px;
  border-left-color: ${({ color }) => color};

  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`