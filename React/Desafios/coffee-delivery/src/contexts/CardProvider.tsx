import { type OrderInfo } from '@/pages/Cart'
import {
  addItemAction,
  checkoutCartAction,
  decrementQuantityItemAction,
  incrementQuantityItemAction,
  removeItemAction,
} from '@/reducers/action'
import { cartReducer, type Item, type Order } from '@/reducers/reducer'
import { createContext, useEffect, useReducer, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface CartContextType {
  cart: Item[]
  orders: Order[]
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  decrementQuantityItem: (itemId: Item['id']) => void
  incrementQuantityItem: (itemId: Item['id']) => void
  checkout: (order: OrderInfo) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cart: [],
      orders: [],
    },
    cartState => {
      const localStorageAsJson = localStorage.getItem('@coffee-delivery:cart-state-1.0.0')

      if (localStorageAsJson) {
        return JSON.parse(localStorageAsJson)
      }

      return cartState
    },
  )

  const navigate = useNavigate()

  const { cart, orders } = cartState

  function addItem(item: Item) {
    dispatch(addItemAction(item))
  }

  function removeItem(itemId: Item['id']) {
    dispatch(removeItemAction(itemId))
  }

  function decrementQuantityItem(itemId: Item['id']) {
    dispatch(decrementQuantityItemAction(itemId))
  }

  function incrementQuantityItem(itemId: Item['id']) {
    dispatch(incrementQuantityItemAction(itemId))
  }

  function checkout(order: OrderInfo) {
    dispatch(checkoutCartAction(order, navigate))
  }

  useEffect(() => {
    if (cartState) {
      const cartStateAsJson = JSON.stringify(cartState)
      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', cartStateAsJson)
    }
  }, [cartState])

  return (
    <CartContext.Provider
      value={{
        addItem,
        cart,
        orders,
        decrementQuantityItem,
        incrementQuantityItem,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
