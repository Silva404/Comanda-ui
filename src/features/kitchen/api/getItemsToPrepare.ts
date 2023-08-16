import { Menu } from '@/features/tab/types'
import { axios } from '@/lib/axios'

export function getItemsToPrepare(restaurant: string): Promise<Menu> {
  return axios.get(`/${restaurant}/kitchen/items-to-prepare`)
}
