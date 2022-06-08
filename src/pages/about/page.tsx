import { BaseTemplate } from '@app/computed/widgets/templates'
import { Content } from '@app/shared/ui/content'
import { Title } from '@app/shared/ui/title'

export interface Props {
  content: string
}

export function AboutPage({ content }: Props) {
  return (
    <>
      <Title>About</Title>
      <Content>
        <p>{content}</p>
      </Content>
    </>
  )
}

AboutPage.Layout = BaseTemplate
