import { useStore } from 'effector-react'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { BaseLayout, createGetInitialProps } from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $bio, pageStarted } from './model'

export const ProfilePage: NextPageWithLayout = () => {
  const user = useStore($authenticatedUser)
  const bio = useStore($bio)

  return (
    <>
      <Title>My profile</Title>
      <Content>
        <>
          <pre>User: {JSON.stringify(user, null, 2)}</pre>
          <pre className="mt-8">Bio: {JSON.stringify(bio, null, 2)}</pre>
        </>
      </Content>
    </>
  )
}

ProfilePage.getLayout = (component) => <BaseLayout>{component}</BaseLayout>

export const getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
  create:
    (scope) =>
    async ({ res }) => {
      const notFound = scope.getState($bio) === null
      if (notFound && res) res.statusCode = 404
      return { notFound }
    },
})
