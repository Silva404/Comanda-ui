import { axios } from '@/lib/axios'
import { useQuery } from 'react-query'
import { Tab } from '../types'

export const getTab = (
  restaurant: string,
  tabId: string,
  clientId: string
): Promise<Tab> => {
  return axios.get(`/${restaurant}/tabs/${tabId}/${clientId}`)
}

export const useTab = (restaurant: string, tabId: string, clientId: string) => {
  return useQuery([`${restaurant}-open-tabs`], () =>
    getTab(restaurant, tabId, clientId)
  )
}
