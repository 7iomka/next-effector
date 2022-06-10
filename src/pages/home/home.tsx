import { useStore } from 'effector-react'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { BaseLayout, createGetInitialProps } from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { pageStarted } from './model'

export const HomePage: NextPageWithLayout = () => {
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

HomePage.getLayout = (component) => <BaseLayout>{component}</BaseLayout>

export const getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
})
