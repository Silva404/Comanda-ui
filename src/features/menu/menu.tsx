import { Pencil } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/accordion'
import { Button } from '@/components/button'
import { Dialog, DialogTrigger } from '@/components/dialog'
import { NewCategoryDialog } from './components/new-category-dialog'
import { useState } from 'react'

const categories = [
  {
    id: '1',
    name: 'Vinhos',
    items: [
      {
        id: '232323',
        name: 'Cachaca',
        price: '85.3',
        currency: 'BRL',
        description:
          'A cachaca Princesa Isabel Amburana tem proaeajo lsdjas dasdmnaslkdhjaslkdjasldj asldsad ',
        image:
          'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQUeapVVwUmTQ7Zjx4lvffOfrgGENEh9-rSPwDbov6J_Z9l2yJWxSemTPhUkGLX5vAw'
      },
      {
        id: '12345',
        name: 'Cachaca 2 2',
        price: '85.3',
        currency: 'BRL',
        description:
          'A cachaca Princesa Isabel Amburana tem proaeajo lsdjas dasdmnaslkdhjaslkdjasldj asldsad ',
        image:
          'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQUeapVVwUmTQ7Zjx4lvffOfrgGENEh9-rSPwDbov6J_Z9l2yJWxSemTPhUkGLX5vAw'
      }
    ]
  },
  {
    id: '2',
    name: 'Pao',
    items: [
      {
        id: '123',
        name: 'Cachaca',
        price: '85.3',
        currency: 'BRL',
        description:
          'A cachaca Princesa Isabel Amburana tem proaeajo lsdjas dasdmnaslkdhjaslkdjasldj asldsad ',
        image:
          'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQUeapVVwUmTQ7Zjx4lvffOfrgGENEh9-rSPwDbov6J_Z9l2yJWxSemTPhUkGLX5vAw'
      },
      {
        id: '1234',
        name: 'Cachaca 2 2 asuhaskjdhsa dsdashdasd eaea eaea eae ',
        price: '85.3',
        currency: 'BRL',
        description:
          'A cachaca Princesa Isabel Amburana tem proaeajo lsdjas dasdmnaslkdhjaslkdjasldj asldsad ',
        image:
          'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQUeapVVwUmTQ7Zjx4lvffOfrgGENEh9-rSPwDbov6J_Z9l2yJWxSemTPhUkGLX5vAw'
      }
    ]
  }
]

export function Menu() {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  return (
    <div className="mx-auto w-11/12 p-2">
      <h1 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Cardapio
      </h1>
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar nova categoria</Button>
        </DialogTrigger>
        <NewCategoryDialog close={() => setCategoryDialogOpen(false)} />
      </Dialog>
      <Accordion type="single" collapsible>
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>
              <div className="flex h-full flex-col gap-4">
                <button className="flex w-full items-center justify-center rounded-md bg-blue-400 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400/90">
                  Add new
                </button>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid h-[100px] cursor-pointer grid-cols-[0.4fr_1fr] gap-3 overflow-hidden rounded"
                  >
                    <img
                      className="h-full w-full rounded object-cover"
                      alt="wine"
                      src={item.image}
                    />
                    <div className="flex flex-col overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h1 className="mb-1 overflow-x-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-none tracking-tight">
                          {item.name}
                        </h1>
                        <Pencil className="h-3" />
                      </div>
                      <p className="mb-1 overflow-x-hidden text-ellipsis whitespace-nowrap text-xs font-light text-gray-600">
                        {item.description}
                      </p>
                      <span className="font-medium text-gray-700">
                        R$ {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
