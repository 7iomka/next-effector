import { useStore } from 'effector-react'
import {
  BaseLayoutWithAside,
  createGetInitialProps,
} from '@/computed/widgets/layouts/base-with-aside'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $bio, pageStarted } from './model'

export function AccountInnerPage() {
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

AccountInnerPage.Layout = BaseLayoutWithAside
AccountInnerPage.getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
