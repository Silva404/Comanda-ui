import { Pencil } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/accordion'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/dialog'
import { NewCategoryDialog } from './components/new-category-dialog'
import { useState } from 'react'
import { useMenuCategories } from './api/get-categories'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { useForm } from 'react-hook-form'
import {
  CreateMenuItem,
  MenuItem,
  menuItemSchema,
  useCreateMenuItem
} from './api/create-menu-item'
import { zodResolver } from '@hookform/resolvers/zod'

export function Menu() {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const restaurant = 'lamercan'
  const categories = useMenuCategories(restaurant)
  const createItem = useCreateMenuItem()
  const itemForm = useForm<MenuItem>({
    resolver: zodResolver(menuItemSchema)
  })
  function itemSubmit(data: CreateMenuItem) {
    createItem.mutate(data)
    itemForm.reset()
  }
  function editItemSubmit(data: CreateMenuItem & { itemId: string }) {}

  function CreateItemForm({ categoryId }: { categoryId: string }) {
    return (
      <form
        onSubmit={itemForm.handleSubmit((data) =>
          itemSubmit({
            restaurant,
            categoryId,
            menuItem: data
          })
        )}
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Nome
              </Label>
              <Input
                id="name"
                {...itemForm.register('name')}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="price" className="text-left">
                Preco
              </Label>
              <Input
                id="price"
                {...itemForm.register('price')}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Descricao
              </Label>
              <Input
                id="description"
                {...itemForm.register('description')}
                className="col-span-3"
              />
            </div>
          </div>
        </div>
        <Button
          variant="default"
          disabled={itemForm.formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          Criar item
        </Button>
      </form>
    )
  }
  function EditItemForm({
    item,
    categoryId
  }: {
    item: MenuItem & { id: string }
    categoryId: string
  }) {
    return (
      <form
        onSubmit={itemForm.handleSubmit((data) =>
          editItemSubmit({
            restaurant,
            categoryId,
            menuItem: data,
            itemId: item.id
          })
        )}
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Nome
              </Label>
              <Input
                id="name"
                defaultValue={item.name}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="price" className="text-left">
                Preco
              </Label>
              <Input
                id="price"
                defaultValue={item.price}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Descricao
              </Label>
              <Input
                id="description"
                defaultValue={item.description}
                className="col-span-3"
              />
            </div>
          </div>
        </div>
        <Button variant="default" type="submit" className="w-full">
          Salvar
        </Button>
      </form>
    )
  }
  return (
    <div className="mx-auto w-11/12 py-8">
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <div className="flex items-center justify-between">
          <h1 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
            Cardapio
          </h1>
          <DialogTrigger asChild>
            <Button variant="outline">Nova Categoria</Button>
          </DialogTrigger>
        </div>
        <NewCategoryDialog close={() => setCategoryDialogOpen(false)} />
      </Dialog>
      {categories.isLoading && (
        <div className="flex items-center justify-center py-10">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {categories.isError && <div> ERRORR </div>}
      {categories.data && (
        <Accordion type="single" collapsible>
          {categories.data.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="rounded px-2 hover:bg-black/5">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex h-full flex-col gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="my-2" variant="default">
                        Novo item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo item</DialogTitle>
                      </DialogHeader>
                      <CreateItemForm categoryId={category.id} />
                    </DialogContent>
                  </Dialog>
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="grid h-[100px] cursor-pointer grid-cols-[0.4fr_1fr] gap-3 overflow-hidden rounded"
                    >
                      <img
                        className="h-full w-full rounded object-cover"
                        alt="wine"
                        src={item.image}
                      />
                      <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h1 className="mb-1 overflow-x-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-none tracking-tight">
                            {item.name}
                          </h1>
                          <Dialog>
                            <DialogTrigger>
                              <Pencil className="h-5 w-5 rounded p-1 hover:bg-black/5" />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar item</DialogTitle>
                              </DialogHeader>
                              <EditItemForm
                                item={item}
                                categoryId={category.id}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                        <p className="mb-1 overflow-x-hidden text-ellipsis whitespace-nowrap text-xs font-light text-gray-600">
                          {item.description}
                        </p>
                        <span className="font-medium text-gray-700">
                          R$ {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
