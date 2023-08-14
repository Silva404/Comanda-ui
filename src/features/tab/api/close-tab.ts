import { axios } from '@/lib/axios'

export function closeTab(restaurant: string, tabId: string): Promise<void> {
  return axios.post(`/${restaurant}/tab/${tabId}/close`)
}
