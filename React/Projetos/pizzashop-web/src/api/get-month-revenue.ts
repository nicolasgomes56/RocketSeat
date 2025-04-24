import { api } from '@/lib/axios'

export interface GetMonthRevenueOrdersResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenueOrders() {
  const response = await api.get<GetMonthRevenueOrdersResponse>(
    '/metrics/month-receipt',
  )
  return response.data
}
