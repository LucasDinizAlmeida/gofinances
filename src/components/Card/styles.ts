
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface TypeProps {
  type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
  width: ${RFValue(300)}px;
  height: ${RFValue(200)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px;
  margin-right: 16px;
  background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
  `

export const Title = styled.Text<TypeProps>`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
  `

export const Icon = styled(Feather) <TypeProps>`
    font-size: ${RFValue(40)}px;
    /* color: ${({ theme, type }) => theme.colors.success}; */

    ${({ type, theme }) => type === 'up' && css` color: ${theme.colors.success}`}
    ${({ type, theme }) => type === 'down' && css` color: ${theme.colors.attetion}`}
    ${({ type, theme }) => type === 'total' && css`color: ${theme.colors.shape}`}
  `

export const Footer = styled.View`
  padding-top: 38px;
`

export const Amount = styled.Text<TypeProps>`
    font-size: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};
    padding-bottom: 5px;
  `

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.title};

`