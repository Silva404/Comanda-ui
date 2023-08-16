import { Categories } from '@/features/menu/types'
import { Items, Menu, Tables, Waiters } from '@/features/tab/types'

export const timestamp = 'Aberto ha 2 horas'

export const menu: Menu = [
  { name: 'Coca zero', note: 'Com limao e gelo', menuNumber: 3, id: '121212' },
  { name: 'Agua', note: 'Com limao e gelo', menuNumber: 4, id: '432312121212' }
]
const copy = { timestamp, menu }

export const waiters: Waiters = [
  { name: 'Ronaldo', id: 1 },
  { name: 'Wanessa', id: 2 }
]

export const openTables: Tables = [
  {
    number: 1,
    tabs: [
      { id: 'random-1', name: 'Danielzim da feirinha', ...copy },
      { id: 'random-2', name: 'Breno', ...copy }
    ]
  },
  {
    number: 98,
    tabs: [{ id: 'random-3', name: 'Danielzim da feirinha', ...copy }]
  },
  {
    number: 25,
    tabs: [{ id: 'random-4', name: 'Breno', ...copy }]
  }
]

export const categoriesWithItems: Categories = [
  {
    id: '45',
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
    id: '2232424',
    name: 'Pao',
    items: [
      {
        id: '123',
        name: 'Coca cola',
        price: '85.3',
        currency: 'BRL',
        description:
          'A cachaca Princesa Isabel Amburana tem proaeajo lsdjas dasdmnaslkdhjaslkdjasldj asldsad ',
        image:
          'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQUeapVVwUmTQ7Zjx4lvffOfrgGENEh9-rSPwDbov6J_Z9l2yJWxSemTPhUkGLX5vAw'
      },
      {
        id: '1234',
        name: 'Pepsi',
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

export const menuPerCategory: { [key: string]: any } = {}
categoriesWithItems.forEach((item) => {
  menuPerCategory[item.id] = item.items
})

export const categories = categoriesWithItems.map((category) => ({
  name: category.name,
  id: category.id
}))
