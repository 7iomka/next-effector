import { useStore } from 'effector-react'
import { BaseLayout, createGetInitialProps } from '@/computed/widgets/layouts'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $bio, pageStarted } from './model'

export function MyProfilePage() {
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

MyProfilePage.Layout = BaseLayout

MyProfilePage.getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
  create(scope) {
    return async ({ res }) => {
      const notFound = scope.getState($bio) === null
      if (notFound && res) res.statusCode = 404
      return { notFound }
    }
  },
})
