import { axios } from '@/lib/axios'
import { useMutation } from 'react-query'
import { OrderItem } from '../order-item'

export function orderItem(restaurant: string, tabId: string, itemId: string) {
  return axios.post(`/${restaurant}/tabs/${tabId}/item/${itemId}/order`)
}

export function useOrderItem(restaurant: string) {
  return useMutation({
    mutationFn: (data: OrderItem) =>
      orderItem(restaurant, data.tab_id, data.item_id)
  })
}
