import { ReactNode } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export interface Props {
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

export function BaseLayout({
  header = <Header />,
  children,
  footer = <Footer />,
}: Props) {
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}
