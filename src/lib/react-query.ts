import { DefaultOptions, QueryClient } from 'react-query'

const options: DefaultOptions = {
  queries: {
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  }
}

export const queryClient = new QueryClient({
  defaultOptions: options
})
