import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '@/api/get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+55 11 99999-9999',
    },
    createdAt: new Date().toISOString(),
    status: 'pending',
    totalInCents: 6000,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'Pizza de Calabresa',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: {
          name: 'Pizza de Marguerita',
        },
        quantity: 1,
      },
      {
        id: 'order-item-3',
        priceInCents: 3000,
        product: {
          name: 'Pizza de Frango com Catupiry',
        },
        quantity: 1,
      },
    ],
  })
})
