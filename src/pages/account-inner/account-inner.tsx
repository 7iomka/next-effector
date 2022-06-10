import { useStore } from 'effector-react'
import { $authenticatedUser } from '@/entities/authenticated-user'
import {
  createGetInitialProps,
  getBaseLayoutWithAside,
} from '@/pages/shared/layouts/base-with-aside'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $bio, pageStarted } from './model'

export const AccountInnerPage: NextPageWithLayout = () => {
  const user = useStore($authenticatedUser)
  const bio = useStore($bio)

  return (
    <>
      <Title>AccountInner page</Title>
      <Content>
        <pre>User: {JSON.stringify(user, null, 2)}</pre>
        <pre className="mt-8">Bio: {JSON.stringify(bio, null, 2)}</pre>
      </Content>
    </>
  )
}

AccountInnerPage.getLayout = getBaseLayoutWithAside

export const getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
