import { categories } from '@/features/menu/mocks'
import { rest } from 'msw'

export const handlers = [
  rest.post('/:restaurant/menu/create-category', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json({}))
  }),
  rest.post('/:restaurant/menu/category/:id/edit', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
  rest.post('/:restaurant/menu/category/:id/create-item', (_, res, ctx) => {
    return res(ctx.status(200), ctx.delay(2000), ctx.json({}))
  }),
  rest.get('/:restaurant/menu/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(categories))
  })
]
