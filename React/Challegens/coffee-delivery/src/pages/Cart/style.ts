import { fonts } from '@/styles/themes/fonts'
import { styled } from 'styled-components'

export const CartContainer = styled.main`
  display: flex;
  max-width: 1160px;
  padding: 40px 20px;
  margin: 0 auto;
  gap: 32px;
`
export const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    ${fonts.titleXS};
    color: ${({ theme }) => theme.colors['base-subtitle']};
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`
export const CartFormBase = styled.div`
  padding: 40px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors['base-card']};
  width: 100%;
  min-width: 640px;

  display: flex;
  flex-direction: column;
  gap: 32px;
`
export const CartFormAddress = styled(CartFormBase)``

export const CartHeading = styled.div`
  display: flex;
  gap: 8px;

  div {
    span {
      color: ${({ theme }) => theme.colors['base-subtitle']};
    }

    p {
      ${fonts.textS};
    }
  }
`

export const CartAddressHeading = styled(CartHeading)`
  svg {
    color: ${({ theme }) => theme.colors['yellow-dark']};
  }
`

export const AddressForm = styled.div`
  display: grid;
  grid-template-areas:
    'cep . .'
    'rua rua rua'
    'numero complemento complemento'
    'bairro city uf';
  grid-template-columns: 200px 1fr 60px;
  grid-gap: 16px 12px;
`
export const CartPaymentContainer = styled(CartFormBase)``

export const CartPaymentHeading = styled(CartHeading)`
  svg {
    color: ${({ theme }) => theme.colors.purple};
  }
`

export const CartPaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
`
export const Coffee = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    > img {
      width: 64px;
      height: 64px;
    }

    display: flex;
    align-items: stretch;
    gap: 20px;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  > aside {
    font-weight: bold;
  }
`

export const CartCoffeeInfo = styled.div`
  display: flex;
  gap: 8px;

  > button {
    padding: 6px 8px;
    background-color: ${({ theme }) => theme.colors['base-button']};
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;

    transition: all 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors['base-hover']};
    }

    > svg {
      color: ${({ theme }) => theme.colors.purple};
    }

    > span {
      ${fonts.buttonM};
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors['base-text']};
    }
  }
`

export const CartTotal = styled.div`
  padding: 40px;
  border-radius: 6px 36px;
  background-color: ${({ theme }) => theme.colors['base-card']};
  width: 100%;
  min-width: 448px;

  > span {
    display: block;
    height: 1px;
    background-color: ${({ theme }) => theme.colors['base-button']};
    margin: 24px 0;
  }
`

export const CartTotalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span:first-child {
      ${fonts.textS};
    }

    span:last-child {
      ${fonts.textM};
    }
  }

  div:last-child {
    span {
      ${fonts.textL};
      font-weight: bold;
    }
  }
`

export const CheckoutButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px;
  text-transform: uppercase;

  ${fonts.buttonG};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.yellow};

  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors['yellow-dark']};
  }

  border-radius: 6px;
`

export const CartPaymentErrorMessage = styled.p`
  ${fonts.textXS};
  font-weight: 400;
  color: red;
`
