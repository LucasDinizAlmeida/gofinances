import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { BorderlessButton } from 'react-native-gesture-handler';

interface CardCategoryProps {
  color: string
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;


export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;

  background-color: ${({ theme }) => theme.colors.primary};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Body = styled.View`
  padding: 28px 24px;
  flex: 1;
`

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
`

export const MonthSelectButton = styled(BorderlessButton)`

`

export const MonthSelectIcon = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Month = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const Content = styled(ScrollView)`
  /* flex: 1;
  padding: 0 24px; */
  /* padding-bottom: 25px; */
`

export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center; 
  justify-content: center;
`

