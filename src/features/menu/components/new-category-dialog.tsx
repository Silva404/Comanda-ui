import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Button } from '@/components/button'
import { useCreateMenuCategory } from '../api/create-category'

const newCategorySchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  })
})

type newCategory = z.infer<typeof newCategorySchema>

export function NewCategoryDialog({ close }: { close: () => void }) {
  const form = useForm<newCategory>({
    resolver: zodResolver(newCategorySchema)
  })
  const restaurant = 'lamercan'
  const createMenuCategory = useCreateMenuCategory(restaurant, close)

  function onSubmit(values: newCategory) {
    createMenuCategory.mutate(values.name)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Criar categoria</DialogTitle>
        <DialogDescription>Crie uma nova categoria</DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...form.register('name', { required: true })}
              />
            </div>
            {form.formState.errors.name && (
              <div className="destructive group group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-destructive bg-destructive p-2 pr-8 text-xs text-destructive-foreground shadow-lg transition-all">
                {form.formState.errors.name.message}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2  lg:inline">
            <Button onClick={close} variant={'outline'} className="w-full">
              Cancelar
            </Button>
            <Button type="submit" className="w-full">
              {createMenuCategory.isLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
