import { axios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'react-query'

const createMenuCategory = (
  restaurant: string,
  categoryName: string
): Promise<void> => {
  return axios.post(`/${restaurant}/menu/create-category`, {
    name: categoryName
  })
}

export const useCreateMenuCategory = (
  restaurant: string,
  onSuccess: () => void
) => {
  const queryClient = useQueryClient()
  return useMutation(
    (categoryName: string) => createMenuCategory(restaurant, categoryName),
    {
      onSuccess: () => {
        onSuccess()
        queryClient.invalidateQueries({
          queryKey: `${restaurant}-menu-categories`
        })
      }
    }
  )
}
