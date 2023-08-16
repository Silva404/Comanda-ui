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

export function Kitchen() {
  const menu = useLoaderData() as Menu
  return (
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
          {menu.menu.map((item) => (
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
                        <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
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
  )
}
