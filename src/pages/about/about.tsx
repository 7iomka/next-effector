import { useStore } from 'effector-react/scope'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { BaseLayout, createGetStaticProps } from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $description, pageStarted } from './model'

export interface Props {
  customText: string
}

export const AboutPage: NextPageWithLayout<Props> = ({ customText }) => {
  console.info('AboutPage: render')
  const user = useStore($authenticatedUser) // from entity model (global)
  const description = useStore($description) // from page model

  return (
    <>
      <Title>About</Title>
      <Content>
        <div>
          <h3>This page is SSG</h3>
          <br />
          User is loaded: {user?.firstName}
          <br />
        </div>
        <p className="mt-4">{description}</p>
        <p className="mt-4">{customText}</p>
      </Content>
    </>
  )
}

// Custom component inside one of widgets from used layout
const CustomFooter = () => (
  <footer className="py-6 bg-slate-100"> custom footer </footer>
)

AboutPage.getLayout = (component) => (
  <BaseLayout footer={<CustomFooter />}>{component}</BaseLayout>
)

export const getStaticProps = createGetStaticProps({
  pageEvent: pageStarted,
  customize() {
    return {
      props: {
        customText:
          'Some SSG page custom text with revalidate each 10 sec, result is ' +
          Math.random(),
      },
      revalidate: 10, // In seconds
    }
  },
})
