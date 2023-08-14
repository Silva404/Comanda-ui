import { Link, Outlet } from 'react-router-dom'

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
  return (
    <div className="relative overflow-hidden bg-white antialiased">
      <Header />

      <div className="mx-auto w-11/12 py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Root
