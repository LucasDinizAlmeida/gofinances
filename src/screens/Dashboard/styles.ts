

import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { FlatList, FlatListProps } from 'react-native'


import { BorderlessButton } from 'react-native-gesture-handler'
import { DataListProps } from '../../utils/types/TransactiosType';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center; 
  justify-content: center;
`

export const Header = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
export const LogoutButton = styled(BorderlessButton)``


export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  margin-top: ${RFPercentage(20)}px;
  position: absolute;
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  margin-bottom: 16px;

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ theme }) => theme.colors.title};
`

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle:{
    marginBottom: getBottomSpace()
  }
})``

// export const Transactions = styled.ScrollView.attrs({
//   showsVerticallScrollIndicator: false,
//   contentContainerStyle: { paddingHorizontal: 24 }
// })`
  
//   width: ${RFValue(357)}px;
// `

// export const TransactionsTitle = styled.Text`
//   font-family: ${({ theme }) => theme.fonts.regular};
//   font-size: ${RFValue(18)}px;
//   color: ${({ theme }) => theme.colors.title_dark};

//   margin-top: ${RFValue(78)}px;
//   margin-left: ${RFValue(24)}px;
//   margin-bottom: ${RFValue(16)}px;
// `


