import { Toaster } from '@/components/toast'
import { cn } from '@/lib/utils'
import { NavLink, Outlet, useNavigation } from 'react-router-dom'

function Header() {
  return (
    <div className="flex items-center gap-3 bg-[#343a40] p-3">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            'text-2xl font-semibold tracking-tight text-white transition-all',
            isActive ? '' : 'opacity-90'
          )
        }
      >
        Comanda Fácil
      </NavLink>
      <NavLink
        to="/kitchen"
        className={({ isActive }) =>
          cn(
            'cursor-pointer rounded px-2 py-1 text-base font-semibold tracking-tight text-white/75 transition-all hover:text-white/90',
            isActive ? 'bg-gray-600' : 'bg-transparent'
          )
        }
      >
        Cozinha
      </NavLink>{' '}
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          cn(
            'cursor-pointer rounded px-2 py-1 text-base font-semibold tracking-tight text-white/75 transition-all hover:text-white/90',
            isActive ? 'bg-gray-600' : 'bg-transparent'
          )
        }
      >
        Cardapio
      </NavLink>
    </div>
  )
}

function Root() {
  const navigation = useNavigation()
  return (
    <>
      <div className="relative overflow-hidden bg-white antialiased">
        <Header />

        <div
          className={cn(
            'mx-auto w-11/12 py-8',
            navigation.state === 'loading'
              ? 'opacity-50 transition-opacity duration-1000'
              : ''
          )}
        >
          <Outlet />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Root
