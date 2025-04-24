import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '2021-09-01',
      receipt: 100000,
    },
    {
      date: '2021-09-02',
      receipt: 200000,
    },
    {
      date: '2021-09-03',
      receipt: 300000,
    },
    {
      date: '2021-09-04',
      receipt: 400000,
    },
    {
      date: '2021-09-05',
      receipt: 500000,
    },
    {
      date: '2021-09-06',
      receipt: 600000,
    },
    {
      date: '2021-09-07',
      receipt: 700000,
    },
    {
      date: '2021-09-08',
      receipt: 800000,
    },
    {
      date: '2021-09-09',
      receipt: 900000,
    },
    {
      date: '2021-09-10',
      receipt: 1000000,
    },
    {
      date: '2021-09-11',
      receipt: 1100000,
    },
    {
      date: '2021-09-12',
      receipt: 1200000,
    },
    {
      date: '2021-09-13',
      receipt: 1300000,
    },
    {
      date: '2021-09-14',
      receipt: 1400000,
    },
    {
      date: '2021-09-15',
      receipt: 1500000,
    },
    {
      date: '2021-09-16',
      receipt: 1600000,
    },
    {
      date: '2021-09-17',
      receipt: 1700000,
    },
    {
      date: '2021-09-18',
      receipt: 1800000,
    },
    {
      date: '2021-09-19',
      receipt: 1900000,
    },
    {
      date: '2021-09-20',
      receipt: 2000000,
    },
    {
      date: '2021-09-21',
      receipt: 2100000,
    },
    {
      date: '2021-09-22',
      receipt: 2200000,
    },
  ])
})
