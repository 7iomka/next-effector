import { ReactNode } from 'react'
import { Aside } from '@/widgets/aside'
import { BaseLayout } from '../base/ui'

export interface Props {
  aside?: ReactNode
  children?: ReactNode
}

export const BaseLayoutWithAside = ({ aside = <Aside />, children }: Props) => {
  return (
    <BaseLayout>
      <div className="flex">
        {aside}
        <div className="ml-4">{children}</div>
      </div>
    </BaseLayout>
  )
}

export const getBaseLayoutWithAside: NextLayoutGetter = (component) =>
  BaseLayoutWithAside({ children: component })

// This case trigger rerender, because another react root component was returned
// export const getBaseLayoutWithAside: NextLayoutGetter = (component) => (
//   <BaseLayoutWithAside>{component}</BaseLayoutWithAside>
// )
