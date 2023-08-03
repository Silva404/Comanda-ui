import { z } from 'zod'

const currencySchema = z.enum(['BRL', 'USD', 'EUR'])

const categorySchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string().min(2),
    items: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(2),
        price: z.string().min(1),
        currency: currencySchema,
        description: z.string().min(1),
        image: z.string().min(1)
      })
    )
  })
)

export type Categories = z.infer<typeof categorySchema>
