import { Minus, Plus } from 'phosphor-react'
import { QuantityContainer } from './style'

interface Props {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function QuantityInput({ quantity, incrementQuantity, decrementQuantity }: Props) {
  return (
    <QuantityContainer>
      <button onClick={decrementQuantity}>
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button onClick={incrementQuantity}>
        <Plus size={14} />
      </button>
    </QuantityContainer>
  )
}
