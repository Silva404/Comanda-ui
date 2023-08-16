import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/table'
import { typographies } from '@/components/typography'
import { useLoaderData } from 'react-router-dom'
import { Menu } from '../tab/types'
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
import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMarkItemAsPrepared } from './api/mark-item-as-served'
import { z } from 'zod'
import { toast } from '@/components/use-toast'

const ItemPreparedSchema = z.object({ item_id: z.string() })

export type ItemPrepared = z.infer<typeof ItemPreparedSchema>

export function Kitchen() {
  const restaurant = 'lamercan'
  const menu = useLoaderData() as Menu
  const [alertDialog, setAlertDialog] = useState(false)
  function itemIsPrepared() {
    setAlertDialog(false)
    toast({ title: 'Item is Prepared' })
  }
  const markItemAsPrepared = useMarkItemAsPrepared(restaurant, itemIsPrepared)
  const form = useForm<ItemPrepared>()

  return (
    <div>
      <h3
        className={typographies({
          as: 'h2',
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
            <TableHead>Marcar como preparado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menu.map((item) => (
            <TableRow>
              <TableCell>{item.menuNumber}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <AlertDialog open={alertDialog} onOpenChange={setAlertDialog}>
                  <AlertDialogTrigger asChild>
                    <Button className="flex gap-2">
                      Marcar como preparado
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <form
                      onSubmit={form.handleSubmit(() =>
                        markItemAsPrepared.mutate({
                          item_id: item.id
                        })
                      )}
                    >
                      <AlertDialogHeader>
                        <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa acao nao pode ser desfeita, esse item sera
                          alertado como preparado a todos os garcons.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <Button type="submit">
                          {markItemAsPrepared.isLoading ? (
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
  )
}
