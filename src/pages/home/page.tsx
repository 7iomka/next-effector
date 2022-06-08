import { useStore } from 'effector-react'
import { BaseTemplate } from '@app/computed/widgets/templates'
import { $authenticatedUser } from '@app/entities/authenticated-user'
import { Content } from '@app/shared/ui/content'
import { Title } from '@app/shared/ui/title'

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

HomePage.Layout = BaseTemplate
