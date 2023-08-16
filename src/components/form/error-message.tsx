import { ReactNode } from 'react'
import { Alert, AlertTitle } from '../alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  )
}
