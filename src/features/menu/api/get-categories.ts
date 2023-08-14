import { axios } from '@/lib/axios'
import { useQuery } from 'react-query'
import { Categories } from '../types'

export const getMenuCategories = (restaurant: string): Promise<Categories> => {
  return axios.get(`/${restaurant}/menu/categories`)
}

export const useMenuCategories = (restaurant: string) => {
  return useQuery([`${restaurant}-menu-categories`], () =>
    getMenuCategories(restaurant)
  )
}
