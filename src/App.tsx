import { Link, Outlet } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'

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
        to="/open-tab"
        className="cursor-pointer scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Abrir comanda
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

export function PlaceOrder() {
  return (
    <form>
      <div className="mb-6">
        <label
          htmlFor="client_name"
          className="mb-2 block text-sm font-medium text-black"
        >
          Nome do cliente
        </label>
        <input
          id="client_name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Abrir comanda
      </button>
    </form>
  )
}

function App() {
  return (
    <div className="relative overflow-hidden bg-white antialiased">
      <Header />

      <div className="mx-auto w-11/12 py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default App
