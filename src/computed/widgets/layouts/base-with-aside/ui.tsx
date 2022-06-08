import { ReactNode } from 'react'
import { Aside } from '@/widgets/aside'
import { BaseLayout } from '../base/ui'

export interface Props {
  aside?: ReactNode
  children?: ReactNode
}

export function BaseLayoutWithAside({ aside = <Aside />, children }: Props) {
  return (
    <BaseLayout>
      <div className="flex">
        {aside}
        <div className="ml-4">{children}</div>
      </div>
    </BaseLayout>
  )
}
