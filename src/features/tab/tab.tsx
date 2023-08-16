import { useLoaderData, useNavigate } from 'react-router-dom'
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
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { closeTab } from './api/close-tab'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Spinner } from '@/components/spinner'
import { useMutation } from 'react-query'
import { useToast } from '@/components/use-toast'
import { cancelItem } from './api/cancel-item'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { OrderItemForm } from './order-item'

const CancelItemSchema = z.object({
  restaurant: z.string().optional(),
  tabId: z.string().min(3),
  itemId: z.string().min(3)
})

type CancelItem = z.infer<typeof CancelItemSchema>

export function Tab() {
  const restaurant = 'lamercan'
  const tab = useLoaderData() as TabType
  const { toast } = useToast()
  const navigate = useNavigate()
  const closeTabForm = useForm<CancelItem>()
  const cancelItemForm = useForm<CancelItem>()

  const [addItemDialog, setAddItemDialog] = useState(false)
  const [closeTabDialog, setCloseTabDialog] = useState(false)
  const [cancelItemDialog, setCancelItemDialog] = useState(false)
  const mutation = useMutation({
    mutationFn: (data: Omit<CancelItem, 'itemId'>) =>
      closeTab(data.restaurant!, data.tabId),
    onSuccess: () => {
      toast({ title: 'Comanda cancelada' })
      navigate('/')
    }
  })
  const cancelItemMutation = useMutation({
    mutationFn: (data: CancelItem) =>
      cancelItem(data.restaurant!, data.tabId, data.itemId),
    onSuccess: () => {
      toast({ title: 'Item cancelado com sucesso' })
      setCancelItemDialog(false)
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
          <AlertDialog open={closeTabDialog} onOpenChange={setCloseTabDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex w-full gap-2 md:w-fit">
                Fechar comanda
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <form
                onSubmit={closeTabForm.handleSubmit(() =>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex w-full gap-2 md:w-fit">
                <PlusIcon />
                Adicionar item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo item</DialogTitle>
              </DialogHeader>

              <OrderItemForm tabId={tab.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h3
            className={typographies({
              as: 'h3',
              className: 'mb-4'
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
              {tab.menu.map((item) => (
                <TableRow>
                  <TableCell>{item.menuNumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.note}</TableCell>
                  <TableCell>
                    <Button>Servir</Button>
                  </TableCell>
                  <TableCell>
                    <AlertDialog
                      open={cancelItemDialog}
                      onOpenChange={setCancelItemDialog}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex w-full gap-2 md:w-fit"
                        >
                          Cancelar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <form
                          onSubmit={cancelItemForm.handleSubmit(() =>
                            cancelItemMutation.mutate({
                              restaurant,
                              tabId: tab.id,
                              itemId: item.id
                            })
                          )}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Voce tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa acao nao pode ser desfeita, voce perdera o
                              historico dessa comanda.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <Button type="submit">
                              {cancelItemMutation.isLoading ? (
                                <Spinner className="h-4 fill-black/50" />
                              ) : (
                                'Continuar'
                              )}
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </AlertDialogContent>
                    </AlertDialog>
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
              className: 'mb-4'
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
              {tab.menu.map((item) => (
                <TableRow>
                  <TableCell>{item.menuNumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <AlertDialog
                      open={cancelItemDialog}
                      onOpenChange={setCancelItemDialog}
                    >
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          Cancelar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <form
                          onSubmit={cancelItemForm.handleSubmit(() =>
                            cancelItemMutation.mutate({
                              restaurant,
                              tabId: tab.id,
                              itemId: item.id
                            })
                          )}
                        >
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Voce tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa acao nao pode ser desfeita, voce perdera o
                              historico dessa comanda.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <Button type="submit">
                              {cancelItemMutation.isLoading ? (
                                <Spinner className="h-4 fill-black/50" />
                              ) : (
                                'Continuar'
                              )}
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </AlertDialogContent>
                    </AlertDialog>
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
