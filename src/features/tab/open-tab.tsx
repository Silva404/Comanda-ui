import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Waiters } from './types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertTitle } from '@/components/alert'
import { ReactNode, useEffect } from 'react'
import { useOpenTab } from './api/open-tab'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/select'
import { Spinner } from '@/components/spinner'

const formSchema = z.object({
  client_name: z.string().min(3, {
    message: 'Nome do cliente e necessario'
  }),
  tab_number: z.string().min(1, {
    message: 'Numero da mesa necessario'
  }),
  waiter: z.string().min(2, {
    message: 'Selecione um garcom'
  })
})

export type TabForm = z.infer<typeof formSchema>

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  )
}

export function OpenTab() {
  const restaurant = 'lamercan'
  const waiters = useLoaderData() as Waiters
  const openTab = useOpenTab(restaurant)
  const form = useForm<TabForm>({
    resolver: zodResolver(formSchema)
  })
  const navigate = useNavigate()

  function onSubmit(data: TabForm) {
    openTab.mutate(data)
  }

  useEffect(() => {
    if (openTab.isSuccess) {
      navigate(
        `${restaurant}/tab/${openTab.data.tableId}/${openTab.data.tabId}`
      )
    }
  }, [openTab.isSuccess])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tab_number"
            className="block text-sm font-medium text-black"
          >
            Numero da comanda
          </label>
          <input
            {...form.register('tab_number', { required: true })}
            id="tab_number"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {form.formState.errors.tab_number && (
            <ErrorMessage>
              {form.formState.errors.tab_number.message}
            </ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="client_name"
            className="block text-sm font-medium text-black"
          >
            Nome do cliente
          </label>
          <input
            {...form.register('client_name', { required: true })}
            id="client_name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
          {form.formState.errors.client_name && (
            <ErrorMessage>
              {form.formState.errors.client_name.message}
            </ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className=" block text-sm font-medium text-black"
          >
            Garcom
          </label>
          <Controller
            control={form.control}
            name="waiter"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um garcom" />
                </SelectTrigger>
                <SelectContent>
                  {waiters.map((waiter) => (
                    <SelectItem key={waiter.name} value={waiter.name}>
                      {waiter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.waiter && (
            <ErrorMessage>{form.formState.errors.waiter.message}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          disabled={openTab.isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          {openTab.isLoading && <Spinner className="h-4" />} Abrir comanda
        </button>
      </div>
    </form>
  )
}
