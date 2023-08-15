import { axios } from '@/lib/axios'
import { TabForm } from '../open-tab'
import { useMutation, useQueryClient } from 'react-query'

export function openTab(
  restaurant: string,
  tab: TabForm
): Promise<{ tabId: string; tableId: string }> {
  return axios.post(`${restaurant}/tabs/new`, tab)
}

export const useOpenTab = (restaurant: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (tab: TabForm) => openTab(restaurant, tab),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: `${restaurant}-open-tabs`
      })
    }
  })
}
