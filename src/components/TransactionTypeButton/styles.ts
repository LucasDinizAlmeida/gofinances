import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler'

interface IconProps {
  type: 'up' | 'down'
}

interface ContainerProps {
  isActive: boolean,
  type: 'up' | 'down'
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
`

export const ButtonType = styled(RectButton) <ContainerProps>`
  
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attetion_light};
  `}



  padding: 16px;
  
  
`;


export const Icon = styled(Feather) <IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attetion};
  margin-right: 12px;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`