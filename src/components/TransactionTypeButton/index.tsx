import React from 'react';
import { TouchableOpacityProps } from 'react-native'
import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ButtonType,
  Container,
  Icon,
  Title,
} from './styles';

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}


interface Props extends RectButtonProps {
  title: string,
  type: 'up' | 'down',
  isActive: boolean
}

export function TransactionTypeButton({ type, isActive, title, ...rest }: Props) {
  return (
    <Container
      isActive={isActive}
      type={type}
    >
      <GestureHandlerRootView>
        <ButtonType
          isActive={isActive}
          type={type}
          {...rest}
        >
          <Icon
            name={icon[type]}
            type={type}
          />
          <Title>
            {title}
          </Title>
        </ButtonType>
      </GestureHandlerRootView>
    </Container>

  );
}