import { rest } from 'msw'
import {
  openTables,
  waiters,
  categoriesWithItems,
  menu,
  categories,
  menuPerCategory
} from './fake-data'

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
  rest.get('/:restaurant/menu', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(menuPerCategory))
  }),
  rest.get('/:restaurant/menu/categories', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(500), ctx.json(categories))
  }),
  rest.post('/:restaurant/tab/:tabId/close', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json({}))
  }),
  rest.post('/:restaurant/tab/:tabId/add-item', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json({}))
  }),
  rest.post('/:restaurant/tabs/:tabId/item/:itemId/cancel', (_, res, ctx) => {
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
  rest.get('/:restaurant/menu/categories/items', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(categoriesWithItems))
  }),
  rest.get('/:restaurant/kitchen/items-to-prepare', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(menu))
  })
]
