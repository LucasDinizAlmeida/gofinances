import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'

interface IconProps {
  type: 'income' | 'outcome'
}


export const Container = styled.View`
flex: 1;
`;


export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;

  width: 100%;
  height: ${RFValue(113)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`
export const Form = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`

export const TransactionsType = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`




// export const Content = styled.View`
//   flex: 1;
//   padding: 32px 24px;
//   background-color: ${({ theme }) => theme.colors.background};
// `

// export const ContainerButtons = styled.View`
//   width: 100%;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin: 30px 0;
// `

// export const Button = styled.View`
//   flex: 1;
//   flex-direction: row;
//   background-color: inherit;
//   border-radius: 5px;
//   border: 1px solid ${({ theme }) => theme.colors.text};
//   align-items: center;
//   justify-content: center;
//   padding: 20px 0;
// `

// export const Icon = styled(Feather) <IconProps>`
//   color: ${({ theme, type }) => type === 'income' ? theme.colors.success : theme.colors.attetion};
//   font-size: ${RFValue(24)}px;
// `

// export const ButtonTitle = styled.Text`
//   margin-left: 10px;
//   font-size: ${RFValue(14)}px;
//   font-family: ${({ theme }) => theme.fonts.regular};
//   color: ${({ theme }) => theme.colors.title};
// `

// export const ButtonSubmit = styled.View`
//   width: 100%;
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.colors.secondary};
//   align-items: center;
//   justify-content: center;
//   padding: 24px 0;
//   margin-top: auto;
// `

// export const ButtonSubmitTitle = styled.Text`
//   font-size: ${RFValue(14)}px;
//   font-family: ${({ theme }) => theme.fonts.bold};
//   color: ${({ theme }) => theme.colors.shape};
// `