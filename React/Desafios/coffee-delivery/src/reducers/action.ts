import { type OrderInfo } from '@/pages/Cart'
import { type NavigateFunction } from 'react-router-dom'
import { type Item } from './reducer'

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREMENT_QUANTITY_ITEM = 'INCREMENT_ITEM_QUANTITY',
  DECREMENT_QUANTITY_ITEM = 'DECREMENT_ITEM_QUANTITY',
  CHECKOUT_CART = 'CHECKOUT_CART',
}

export function addItemAction(item: Item) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      item,
    },
  }
}

export function removeItemAction(itemId: Item['id']) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId,
    },
  }
}

export function incrementQuantityItemAction(itemId: Item['id']) {
  return {
    type: ActionTypes.INCREMENT_QUANTITY_ITEM,
    payload: { itemId },
  }
}

export function decrementQuantityItemAction(itemId: Item['id']) {
  return {
    type: ActionTypes.DECREMENT_QUANTITY_ITEM,
    payload: { itemId },
  }
}

export function checkoutCartAction(order: OrderInfo, callback: NavigateFunction) {
  return {
    type: ActionTypes.CHECKOUT_CART,
    payload: {
      order,
      callback,
    },
  }
}
