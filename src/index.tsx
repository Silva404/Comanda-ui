import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import * as reactRouterDom from 'react-router-dom'
import App, { OpenTab, OpenTabs, PlaceOrder } from 'App'
import { Menu } from '@/features/menu/menu'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)
const router = reactRouterDom.createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <OpenTabs /> },
      {
        path: '/open-tab',
        element: <OpenTab />
      },
      { path: '/place-order', element: <PlaceOrder /> },
      { path: '/menu', element: <Menu /> }
    ]
  }
])
root.render(<reactRouterDom.RouterProvider router={router} />)
