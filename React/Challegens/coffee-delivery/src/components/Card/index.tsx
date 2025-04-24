import { useCart } from '@/hooks/useCart'
import { Check, ShoppingCart } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { QuantityInput } from '../QuantityInput'
import {
  CardContainer,
  CardControl,
  CardDescription,
  CardOrder,
  CardPrice,
  CardTags,
  CardTitle,
  CoffeeImg,
} from './style'

interface ICardProps {
  coffee: {
    id: string
    title: string
    description: string
    tags: string[]
    price: number
    image: string
  }
}

export function Card({ coffee }: ICardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const { addItem } = useCart()
  const theme = useTheme()

  function handleAddItem() {
    addItem({ id: coffee.id, quantity })
    setIsItemAdded(true)
    setQuantity(1)
  }

  function incrementQuantity() {
    setQuantity(state => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(state => state - 1)
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false)
      }, 2000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isItemAdded])

  return (
    <CardContainer>
      <CoffeeImg src={coffee.image} alt={coffee.title} />

      <CardTags>
        {coffee.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </CardTags>

      <CardTitle>{coffee.title}</CardTitle>

      <CardDescription>{coffee.description}</CardDescription>

      <CardControl>
        <CardPrice>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </CardPrice>

        <CardOrder $itemAdded={isItemAdded}>
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />

          <button disabled={isItemAdded} onClick={handleAddItem}>
            {isItemAdded ? (
              <Check weight="fill" size={22} color={theme.colors['base-card']} />
            ) : (
              <ShoppingCart size={22} color={theme.colors['base-card']} />
            )}
          </button>
        </CardOrder>
      </CardControl>
    </CardContainer>
  )
}
