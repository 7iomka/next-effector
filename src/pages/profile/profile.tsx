import { useStore } from 'effector-react'
import Error from 'next/error'
import { $authenticatedUser } from '@/entities/authenticated-user'
import {
  createGetInitialProps,
  getBaseLayout,
} from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $bio, pageStarted } from './model'

interface Props {
  notFound?: boolean
}

export const ProfilePage: NextPageWithLayout<Props> = ({ notFound }) => {
  const user = useStore($authenticatedUser)
  const bio = useStore($bio)

  if (notFound) {
    return <Error statusCode={404} />
  }

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

ProfilePage.getLayout = getBaseLayout

export const getInitialProps = createGetInitialProps({
  pageEvent: pageStarted,
  customize({ scope, context }) {
    const { res } = context
    const notFound = scope.getState($bio) === null
    if (notFound && res) res.statusCode = 404
    return { notFound }
  },
})
