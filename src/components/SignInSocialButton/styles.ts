import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`

export const ImageContainer = styled.Text`
  height: 100%;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-right-width: 0.6px;
`