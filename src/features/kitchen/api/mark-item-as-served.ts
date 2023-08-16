import { axios } from '@/lib/axios'
import { useMutation } from 'react-query'
import { ItemPrepared } from '../kitchen'

function markItemAsPrepared(restaurant: string, itemId: string): Promise<void> {
  return axios.post(`/${restaurant}/menu/item/${itemId}/prepared`)
}

export function useMarkItemAsPrepared(restaurant: string) {
  return useMutation({
    mutationFn: (data: ItemPrepared) =>
      markItemAsPrepared(restaurant, data.item_id)
  })
}
