import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { Tables } from './types'
import { Button } from '@/components/button'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/dialog'
import { typographies } from '@/components/typography'
import { PlusIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { OrderItemForm } from './order-item'

export function OpenTabs() {
  const openTables = useLoaderData() as Tables
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div>
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Abrir nova comanda</DialogTitle>
          </DialogHeader>
          <Outlet />
        </DialogContent>
      </Dialog>

      <div className="mb-5 flex items-center justify-between">
        <h2 className={typographies({ as: 'h2' })}>Comandas abertas</h2>
        <Button onClick={() => setModalIsOpen(true)} className="flex gap-2">
          <PlusIcon /> <span className="hidden md:block">Nova comanda</span>
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]  gap-3">
        {openTables.map((table) => (
          <div
            className="flex flex-col gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow"
            key={table.number}
          >
            <h4
              className={cn(
                typographies({ as: 'inlineCode' }),
                'w-fit text-2xl'
              )}
            >
              Mesa #{table.number}
            </h4>
            <p className={typographies({ as: 'h4' })}>Comandas: </p>
            {table.tabs.map((tab) => (
              <p className={typographies({ as: 'lead' })} key={tab.name}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="mr-2">
                      <PlusIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo item</DialogTitle>
                    </DialogHeader>

                    <OrderItemForm tabId={tab.id} />
                  </DialogContent>
                </Dialog>
                <Link
                  to={`/tab/${table.number}/${tab.id}`}
                  className="text-blue-700 underline hover:text-blue-600"
                >
                  {tab.name}
                </Link>{' '}
                - {tab.timestamp}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
