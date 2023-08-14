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
import { Spinner } from '@/components/spinner'
import { typographies } from '@/components/typography'

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
    <div>
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <div className="flex items-center justify-between">
          <h1 className={typographies({ as: 'h2' })}>Cardapio</h1>
          <DialogTrigger asChild>
            <Button variant="outline">Nova Categoria</Button>
          </DialogTrigger>
        </div>
        <NewCategoryDialog close={() => setCategoryDialogOpen(false)} />
      </Dialog>
      {categories.isLoading && (
        <div className="flex items-center justify-center py-10">
          <Spinner />
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
