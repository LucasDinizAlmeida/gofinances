import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

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

export const MounthContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Arrow = styled(AntDesign)`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const MounthTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const CardCategoryList = styled.View`
  margin: 30px 0 auto;
`

