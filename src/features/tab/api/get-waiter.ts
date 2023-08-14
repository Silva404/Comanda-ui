import { axios } from '@/lib/axios'
import { Waiters } from '../types'

export const getWaiters = (restaurant: string): Promise<Waiters> => {
  return axios.get(`/${restaurant}/waiters`)
}
