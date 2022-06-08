import { ReactNode } from 'react'
import { Header } from '@app/widgets/header'

export interface Props {
  header?: ReactNode
  children?: ReactNode
}

export function BaseTemplate({ header = <Header />, children }: Props) {
  return (
    <>
      {header}
      {children}
    </>
  )
}
