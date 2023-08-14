import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Tab as TabType } from './types'
import { Button } from '@/components/button'
import { typographies } from '@/components/typography'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/table'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/alert-dialog'
import { cn } from '@/lib/utils'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { closeTab } from './api/close-tab'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Spinner } from '@/components/spinner'
import { useMutation } from 'react-query'
import { useToast } from '@/components/use-toast'

const CancelItemSchema = z.object({
  restaurant: z.string().optional(),
  tabId: z.string().min(3),
  itemId: z.string().min(3)
})

type CancelItem = z.infer<typeof CancelItemSchema>

export function Tab() {
  const restaurant = 'lamercan'
  const { tabId } = useParams()
  const tab = useLoaderData() as TabType
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isDialogOpen, setDialogOpen] = useState(false)
  const form = useForm<CancelItem>()
  const mutation = useMutation({
    mutationFn: (data: Omit<CancelItem, 'itemId'>) =>
      closeTab(data.restaurant!, data.tabId),
    onSuccess: () => {
      toast({
        title: 'Comanda cancelada'
      })
      navigate('/')
      setDialogOpen(false)
    }
  })
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <h2 className={typographies({ as: 'h2' })}>
          Comanda da mesa{' '}
          <span
            className={cn(
              typographies({
                as: 'inlineCode'
              }),
              'text-2xl'
            )}
          >
            #{tab.id}
          </span>
        </h2>

        <div className="flex w-full items-center gap-2 md:w-fit">
          <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex w-full gap-2 md:w-fit">
                <Cross1Icon />
                Fechar comanda
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form
                onSubmit={form.handleSubmit(() =>
                  mutation.mutate({ restaurant, tabId: tab.id })
                )}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa acao nao pode ser desfeita, voce perdera o historico
                    dessa comanda.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <Button type="submit">
                    {mutation.isLoading ? (
                      <Spinner className="h-4 fill-black/50" />
                    ) : (
                      'Continuar'
                    )}
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
          <Button className="flex w-full gap-2 md:w-fit">
            <PlusIcon />
            Adicionar item
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h3
            className={typographies({
              as: 'h3',
              className: 'mb-4 w-fit border-b'
            })}
          >
            Items à servir
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Numero</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Observacao</TableHead>
                <TableHead>Servido</TableHead>
                <TableHead>Cancelar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tab.items.map((item) => (
                <TableRow>
                  <TableCell>{item.menuNumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <Button>Servir</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="secondary">Cancelar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3
            className={typographies({
              as: 'h3',
              className: 'mb-4 w-fit border-b'
            })}
          >
            Items em preparo
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Numero</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cancelar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tab.items.map((item) => (
                <TableRow>
                  <TableCell>{item.menuNumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Button variant="secondary">Cancelar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
