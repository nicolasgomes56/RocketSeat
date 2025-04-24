import { CartContext } from '@/contexts/CardProvider'
import { useContext } from 'react'

export function useCart() {
  return useContext(CartContext)
}
