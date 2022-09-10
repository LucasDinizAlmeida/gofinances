import React from 'react';
import {
  Container,
  Title,
  ImageContainer
} from './styles';
import { RectButtonProps, GestureHandlerRootView } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg';

interface Props extends RectButtonProps {
  title: string,
  svg: React.FC<SvgProps>
}

export function SignInSocialButton({ svg: Svg, title, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>

        <Title>
          {title}
        </Title>
      </Container>
    </GestureHandlerRootView>

  );
}