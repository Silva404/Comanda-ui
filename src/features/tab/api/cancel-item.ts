import { axios } from '@/lib/axios'

export function cancelItem(restaurant: string, tabId: string, itemId: string) {
  return axios.post(`/${restaurant}/tabs/${tabId}/item/${itemId}/cancel`)
}
