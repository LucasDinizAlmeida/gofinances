

import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const UserInfo = styled.View`
  flex-direction: row;
`

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`
export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  margin: ${RFValue(-50)}px 0;
  /* overflow-x: hidden; */
`


