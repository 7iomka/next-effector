import { useStore } from 'effector-react'
import { BaseTemplate } from '@app/computed/widgets/templates'
import { $authenticatedUser } from '@app/entities/authenticated-user'
import { Content } from '@app/shared/ui/content'
import { Title } from '@app/shared/ui/title'
import { $bio } from './model'

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

MyProfilePage.Layout = BaseTemplate
