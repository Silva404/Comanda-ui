import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import * as reactRouterDom from 'react-router-dom'
import Root from '@/features/root'
import { Menu } from '@/features/menu/menu'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './lib/react-query'
import { OpenTabs } from './features/tab/open-tabs'
import { Tab } from './features/tab/tab'
import { getTab } from './features/tab/api/get-tab'
import { getOpenTabs } from './features/tab/api/get-open-tabs'
import { OpenTab } from './features/tab/open-tab'
import { getWaiters } from './features/tab/api/get-waiter'

const restaurant = 'lamercan'
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const router = reactRouterDom.createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <h1> deu error!</h1>,
    children: [
      {
        path: '/',
        element: <OpenTabs />,
        loader: () => getOpenTabs(restaurant),
        errorElement: <h1> deu error na home!</h1>,
        children: [
          {
            path: '/',
            element: <OpenTab />,
            loader: () => getWaiters(restaurant)
          }
        ]
      },
      {
        path: 'tab/:tableId/:tabId',
        element: <Tab />,
        errorElement: <h1> deu erro na tab!</h1>,
        loader: ({ params }) =>
          getTab(restaurant, params.tableId!, params.tabId!)
      },
      { path: 'menu', element: <Menu /> }
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
