import { axios } from '@/lib/axios'
import { useMutation, useQueryClient } from 'react-query'
import { z } from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(2),
  price: z.string().min(1),
  description: z.string()
})

export type MenuItem = z.infer<typeof menuItemSchema>

export type CreateMenuItem = {
  categoryId: string
  menuItem: MenuItem
  restaurant: string
}

const createMenuItem = (data: CreateMenuItem): Promise<void> => {
  return axios.post(
    `/${data.restaurant}/menu/category/${data.categoryId}/create-item`,
    data
  )
}

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateMenuItem) => createMenuItem(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: `${variables.restaurant}-menu-categories`
      })
    }
  })
}
