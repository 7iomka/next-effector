import { BaseLayout } from '@/computed/widgets/layouts'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'

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

AboutPage.Layout = BaseLayout
