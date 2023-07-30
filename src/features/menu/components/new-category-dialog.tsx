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

  function onSubmit(values: newCategory) {
    console.log(values)
    close()
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
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
