import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { Tables } from './types'
import { Button } from '@/components/button'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/dialog'

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

      <div className="mb-8 flex items-center justify-between">
        <h2 className="scroll-m-20 pb-4 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Comandas abertas
        </h2>
        <Button onClick={() => setModalIsOpen(true)}>Nova comanda</Button>
      </div>
      <div className="flex gap-3">
        {openTables.map((table) => (
          <div
            className="flex max-w-[180px] flex-col items-center rounded border border-black/50 p-4"
            key={table.number}
          >
            <h1 className="mb-4 text-4xl">{table.number}</h1>
            {table.tabs.map((tab) => (
              <p key={tab.name}>
                <Link
                  to={`/tab/${table.number}/${tab.id}`}
                  className="text-blue-700 underline hover:text-blue-600"
                >
                  {tab.name}
                </Link>
                - {tab.timestamp}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
