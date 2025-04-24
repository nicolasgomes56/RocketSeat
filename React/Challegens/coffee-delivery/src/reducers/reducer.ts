import { type OrderInfo } from '@/pages/Cart'
import { produce } from 'immer'
import { ActionTypes } from './action'

export interface Item {
  id: string
  quantity: number
}

export interface Order extends OrderInfo {
  id: number
  items: Item[]
}

interface CartState {
  cart: Item[]
  orders: Order[]
}

export function cartReducer(state: CartState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return produce(state, draft => {
        const addItemCart = draft.cart.find(item => item.id === action.payload.item.id)

        if (addItemCart) {
          addItemCart.quantity += action.payload.item.quantity
        } else {
          draft.cart.push(action.payload.item)
        }
      })

    case ActionTypes.REMOVE_ITEM:
      return produce(state, draft => {
        const removeItemCart = draft.cart.findIndex(item => item.id === action.payload.itemId)

        if (removeItemCart !== -1) {
          draft.cart.splice(removeItemCart, 1)
        }
      })

    case ActionTypes.INCREMENT_QUANTITY_ITEM:
      return produce(state, draft => {
        const incrementQuantityItem = draft.cart.find(item => item.id === action.payload.itemId)

        if (incrementQuantityItem?.id) {
          incrementQuantityItem.quantity += 1
        }
      })

    case ActionTypes.DECREMENT_QUANTITY_ITEM:
      return produce(state, draft => {
        const decrementQuantityItem = draft.cart.find(item => item.id === action.payload.itemId)

        if (decrementQuantityItem?.id && decrementQuantityItem.quantity > 1) {
          decrementQuantityItem.quantity -= 1
        }
      })

    case ActionTypes.CHECKOUT_CART:
      return produce(state, draft => {
        const order = {
          id: new Date().getTime(),
          items: state.cart,
          ...action.payload.order,
        }
        draft.orders.push(order)
        draft.cart = []

        action.payload.callback(`/orders/${order.id}/success`)
      })
    default:
      return state
  }
}
