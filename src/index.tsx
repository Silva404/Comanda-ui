import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import * as reactRouterDom from 'react-router-dom'
import App, { OpenTab, OpenTabs, PlaceOrder } from 'App'
import { Menu } from '@/features/menu/menu'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './lib/react-query'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const router = reactRouterDom.createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/open-tabs', element: <OpenTabs /> },
      {
        path: '/open-tab',
        element: <OpenTab />
      },
      { path: '/place-order', element: <PlaceOrder /> },
      { path: '/menu', element: <Menu /> }
    ]
  }
])

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./tests/mocks/browser')
  worker.start()
}

root.render(
  <QueryClientProvider client={queryClient}>
    <reactRouterDom.RouterProvider router={router} />
  </QueryClientProvider>
)
