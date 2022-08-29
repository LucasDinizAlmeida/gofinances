import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

interface AmountProps {
  type: 'up' | 'down'
}

export const Container = styled.View`
  
  
  height: ${RFValue(128)}px;
  margin-bottom: ${RFValue(16)}px;

  border-radius: 5px;
  padding: 17px 24px;
  background-color: ${({ theme }) => theme.colors.shape};
`;


export const Header = styled.View``

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  line-height: ${RFValue(21)}px;
`

export const Amount = styled.Text<AmountProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attetion};
  line-height: ${RFValue(30)}px;
`

export const Footer = styled.View`
  margin-top: ${RFValue(19)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`



export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  margin-right: 17px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(21)}px;
`

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(21)}px;
`
export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(21)}px;
`