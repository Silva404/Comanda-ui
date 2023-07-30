import { Link, Outlet } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'

function Header() {
  return (
    <div className="flex items-center gap-6 bg-[#343a40] p-4">
      <a
        href="/"
        className="mr-4 text-2xl font-semibold tracking-tight text-white"
      >
        Comanda Fácil
      </a>
      <a
        href="/open-tab"
        className="cursor-pointer scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Abrir comanda
      </a>
      <a
        href="/kitchen"
        className="cursor-pointer  scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Cozinha
      </a>
      <a
        href="/menu"
        className="cursor-pointer  scroll-m-20 text-base font-semibold tracking-tight text-white/75 hover:text-white/90"
      >
        Cardapio
      </a>
    </div>
  )
}

const comandas = [
  {
    number: 1,
    clients: [
      { name: 'Danielzim da feirinha', time: 'Aberta há 1 hora' },
      { name: 'Breno', time: 'Aberta há 1 hora' }
    ]
  },
  {
    number: 98,
    clients: [{ name: 'Danielzim da feirinha', time: 'Aberta há 1 hora' }]
  },
  { number: 25, clients: [{ name: 'Breno', time: 'Aberta há 1 hora' }] }
]

export function OpenTabs() {
  return (
    <div className="mx-auto w-11/12 py-6">
      <h2 className="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Comandas abertas
      </h2>
      <div className="flex gap-3">
        {comandas.map((comanda) => (
          <div
            className="flex max-w-[180px] flex-col items-center rounded border border-black/50 p-4 hover:ring"
            key={comanda.number}
          >
            <h1 className="mb-4 text-4xl">{comanda.number}</h1>
            {comanda.clients.map((client) => (
              <p key={client.name}>
                {client.name} - {client.time}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const formSchema = z.object({
  client_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  tab_number: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  waiter: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})
export function OpenTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto w-11/12 p-6"
    >
      <div className="mb-6">
        <label
          htmlFor="tab_number"
          className="mb-2 block text-sm font-medium text-black"
        >
          Numero da comanda
        </label>
        <input
          {...form.register('tab_number', { required: true })}
          id="tab_number"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="client_name"
          className="mb-2 block text-sm font-medium text-black"
        >
          Nome do cliente
        </label>
        <input
          {...form.register('client_name', { required: true })}
          id="client_name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-black"
        >
          Garcom
        </label>
        <select
          {...form.register('waiter', { required: true })}
          id="waiter"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option selected>Rogerinho</option>
        </select>
      </div>

      <Link to={`/place-order`}>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Abrir comanda
        </button>
      </Link>
    </form>
  )
}

export function PlaceOrder() {
  return (
    <form className="mx-auto w-11/12 p-6">
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
      <Outlet />
    </div>
  )
}

export default App
