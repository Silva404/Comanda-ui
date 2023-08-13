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

export function Tab() {
  const tab = useLoaderData() as TabType
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className={typographies({ as: 'h2' })}>Comanda mesa #{tab.id}</h2>

        <div className="flex items-center gap-2">
          <Button variant="outline">Fechar mesa</Button>
          <Button>Adicionar item</Button>
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
                    <Button>Cancelar</Button>
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
                    <Button>Cancelar</Button>
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
