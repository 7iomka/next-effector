import { useStore } from 'effector-react'
import { $authenticatedUser } from '@/entities/authenticated-user'
import {
  createGetInitialProps,
  getBaseLayoutWithAside,
} from '@/pages/shared/layouts/base-with-aside'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { pageStarted } from './model'

export const AccountPage: NextPageWithLayout = () => {
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

AccountPage.getLayout = getBaseLayoutWithAside

export const getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
