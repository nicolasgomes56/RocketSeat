import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      product: 'Pizza de calabresa',
      amount: 30,
    },
    {
      product: 'Pizza de marguerita',
      amount: 25,
    },
    {
      product: 'Pizza de frango',
      amount: 20,
    },
    {
      product: 'Pizza de portuguesa',
      amount: 15,
    },
  ])
})
