
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
  `

export const Title = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title};
  `

export const Icon = styled(Feather)`
    font-size: ${RFValue(40)}px;
    color: ${({ theme }) => theme.colors.success};
  `

export const Footer = styled.View`
  padding-top: 38px;
`

export const Amount = styled.Text`
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.title};
    padding-bottom: 5px;
  `

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

`