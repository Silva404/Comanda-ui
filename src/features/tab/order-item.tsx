import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/select'
import { Spinner } from '@/components/spinner'
import { ErrorMessage } from '@/components/form/error-message'
import { useGetCategories, useGetMenu } from './api/get-menu'
import { useOrderItem } from './api/order-item'

const formSchema = z.object({
  item_id: z.string().min(1, 'Selecione um item'),
  category_id: z.string().min(1, 'Selecione uma categoria')
})
export type OrderItemSchema = z.infer<typeof formSchema>

export type OrderItem = OrderItemSchema & { tab_id: string }

export function OrderItemForm({ tabId }: { tabId: string }) {
  const restaurant = 'lamercan'
  const menu = useGetMenu(restaurant)
  const categories = useGetCategories(restaurant)
  const order = useOrderItem(restaurant)
  const form = useForm<OrderItemSchema>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(data: OrderItemSchema) {
    order.mutate({ ...data, tab_id: tabId })
  }

  // rethink of this UX of auto selecting first item and maybe
  // - just show the list of all items
  // - maybe show list of items in two tabs one for drinks and one for food
  // - show searchable list of items
  // -
  const category = form.watch('category_id') ?? (categories?.data ?? [])[0]?.id
  const items = menu.data ? menu.data[category] : []

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className=" block text-sm font-medium text-black"
          >
            Categoria
          </label>
          <Controller
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  {categories.data?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.item_id && (
            <ErrorMessage>{form.formState.errors.item_id.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className=" block text-sm font-medium text-black"
          >
            Item
          </label>
          <Controller
            control={form.control}
            name="item_id"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  {items?.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.item_id && (
            <ErrorMessage>{form.formState.errors.item_id.message}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          disabled={order.isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          {order.isLoading && <Spinner className="h-4" />} Adicionar item
        </button>
      </div>
    </form>
  )
}
