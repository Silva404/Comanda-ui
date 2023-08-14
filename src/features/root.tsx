import { Spinner } from '@/components/spinner'
import { Toaster } from '@/components/toast'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { Link, Outlet, useNavigation } from 'react-router-dom'

function Header() {
  return (
    <div className="flex items-center gap-6 bg-[#343a40] p-4">
      <Link
        to="/"
        className="mr-4 text-2xl font-semibold tracking-tight text-white"
      >
        Comanda Fácil
      </Link>
      <Link
        to="/kitchen"
        className="cursor-pointer  scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Cozinha
      </Link>{' '}
      <Link
        to="/menu"
        className="cursor-pointer  scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Cardapio
      </Link>
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
