import { categories } from '@/features/menu/mocks'
import { Items, Tables, Waiters } from '@/features/tab/types'
import { rest } from 'msw'

const timestamp = 'Aberto ha 2 horas'
const items: Items = [
  { name: 'Coca zero', note: 'Com limao e gelo', menuNumber: 3, id: '121212' },
  { name: 'Agua', note: 'Com limao e gelo', menuNumber: 4, id: '432312121212' }
]
const copy = { timestamp, items }

const waiters: Waiters = [
  { name: 'Ronaldo', id: 1 },
  { name: 'Wanessa', id: 2 }
]

const openTables: Tables = [
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

export const handlers = [
  rest.get('/:restaurant/tabs/open', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(openTables))
  }),
  rest.get('/:restaurant/tabs/:tableId/:tabId', (req, res, ctx) => {
    const table = openTables.filter(
      (table) => String(table.number) === req.params.tableId
    )
    const tab = table[0].tabs.filter((tab) => tab.id === req.params.tabId)[0]

    return res(ctx.status(200), ctx.delay(500), ctx.json(tab))
  }),
  rest.post('/:restaurant/tabs/new', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({ tableId: 98, tabId: 'random-3' })
    )
  }),
  rest.post('/:restaurant/tab/:tabId/close', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json({}))
  }),
  rest.get('/:restaurant/waiters', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(waiters))
  }),
  rest.post('/:restaurant/menu/create-category', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json({}))
  }),
  rest.post('/:restaurant/menu/category/:id/edit', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.post('/:restaurant/menu/category/:id/create-item', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json({}))
  }),
  rest.get('/:restaurant/menu/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(categories))
  })
]
