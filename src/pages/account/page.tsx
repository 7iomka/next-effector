import { useStore } from 'effector-react'
import {
  BaseLayoutWithAside,
  createGetInitialProps,
} from '@/computed/widgets/layouts/base-with-aside'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { pageStarted } from './model'

export function AccountPage() {
  const user = useStore($authenticatedUser)

  return (
    <>
      <Title>Account</Title>
      <Content>
        <pre>User: {JSON.stringify(user, null, 2)}</pre>
      </Content>
    </>
  )
}

AccountPage.Layout = BaseLayoutWithAside
AccountPage.getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
