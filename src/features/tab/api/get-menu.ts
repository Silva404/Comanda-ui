import { axios } from '@/lib/axios'
import { useQuery } from 'react-query'

export function getMenu(restaurant: string): Promise<{
  [key: string]: {
    id: string
    name: string
    price: string
    description: string
    image: string
  }[]
}> {
  return axios.get(`/${restaurant}/menu`)
}

export function getCategories(
  restaurant: string
): Promise<{ id: string; name: string }[]> {
  return axios.get(`/${restaurant}/menu/categories`)
}

export function useGetMenu(restaurant: string) {
  return useQuery({
    queryKey: [restaurant, 'menu'],
    queryFn: () => getMenu(restaurant)
  })
}

export function useGetCategories(restaurant: string) {
  return useQuery({
    queryKey: [restaurant, 'categories'],
    queryFn: () => getCategories(restaurant)
  })
}
