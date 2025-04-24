import { fonts } from '@/styles/themes/fonts'
import { styled } from 'styled-components'

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors['base-card']};
  padding: 0 20px 20px;
  border-radius: 6px 36px;
  width: 256px;

  display: flex;
  flex-direction: column;

  text-align: center;
`
export const CoffeeImg = styled.img`
  margin-top: -20px;
  max-width: 120px;
  max-height: 120px;
  align-self: center;
`
export const CardTags = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
  align-self: center;
  gap: 4px;

  span {
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors['yellow-light']};
    color: ${({ theme }) => theme.colors['yellow-dark']};
    text-transform: uppercase;
    ${fonts.tag}
  }
`
export const CardTitle = styled.h3`
  margin-top: 16px;

  color: ${({ theme }) => theme.colors['base-subtitle']};
  ${fonts.titleS}
`

export const CardDescription = styled.span`
  margin-top: 8px;
  width: 100%;

  color: ${({ theme }) => theme.colors['base-label']};
  ${fonts.textS}
`
export const CardControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 32px;
`
export const CardPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;

  span:first-child {
    ${fonts.textS};
    color: ${({ theme }) => theme.colors['base-text']};
  }

  span:last-child {
    ${fonts.titleM};
    color: ${({ theme }) => theme.colors['base-text']};
  }
`

export const CardOrder = styled.div<{ $itemAdded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  > button {
    background-color: ${({ theme, $itemAdded }) =>
      $itemAdded ? theme.colors['yellow-dark'] : theme.colors['purple-dark']};
    transition: background-color 0.2s;
    border-radius: 6px;
    padding: 8px;
    display: flex;

    &:hover {
      background-color: ${({ theme, $itemAdded }) =>
        $itemAdded ? theme.colors.yellow : theme.colors.purple};
    }
  }
`
