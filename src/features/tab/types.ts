import { z } from 'zod'

const ItemSchema = z.array(
  z.object({
    name: z.string().min(3),
    note: z.string().min(5),
    menuNumber: z.number().min(1).nonnegative()
  })
)

const TabSchema = z
  .object({
    id: z.string().min(10),
    name: z.string().min(3),
    timestamp: z.string(),
    items: ItemSchema
  })
  .required()

const TableSchema = z
  .object({
    number: z.number().min(1).nonnegative(),
    tabs: z.array(TabSchema)
  })
  .required()

export type Table = z.infer<typeof TableSchema>

export type Tables = Table[]

export type Tab = z.infer<typeof TabSchema>

export type Items = z.infer<typeof ItemSchema>
