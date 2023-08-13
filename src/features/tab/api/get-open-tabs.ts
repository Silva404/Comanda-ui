import { axios } from '@/lib/axios'
import { useQuery } from 'react-query'
import { Tables } from '../types'

export const getOpenTabs = (restaurant: string): Promise<Tables> => {
  return axios.get(`/${restaurant}/tabs/open`)
}

export const useOpenTabs = (restaurant: string) => {
  return useQuery([`${restaurant}-open-tabs`], () => getOpenTabs(restaurant))
}
