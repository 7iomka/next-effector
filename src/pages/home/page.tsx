import { useStore } from 'effector-react'
import { BaseLayout, createGetInitialProps } from '@/computed/widgets/layouts'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { pageStarted } from './model'

export function HomePage() {
  const user = useStore($authenticatedUser)

  return (
    <>
      <Title>Home</Title>
      <Content>
        <pre>User: {JSON.stringify(user, null, 2)}</pre>
      </Content>
    </>
  )
}

HomePage.Layout = BaseLayout
HomePage.getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
