import { useLoaderData } from 'react-router-dom'
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
import { cn } from '@/lib/utils'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'

export function Tab() {
  const tab = useLoaderData() as TabType
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

        <div className="flex w-full items-center gap-2">
          <Button variant="outline" className="flex w-full gap-2">
            <Cross1Icon />
            Fechar comanda
          </Button>
          <Button className="flex w-full gap-2">
            <PlusIcon />
            Adicionar item
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className={typographies({ as: 'h3' })}>Items à servir</h3>
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
          <h3 className={typographies({ as: 'h3' })}>Items em preparo</h3>
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
