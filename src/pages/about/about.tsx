import { useStore } from 'effector-react/scope'
import { $authenticatedUser } from '@/entities/authenticated-user'
import {
  BaseLayout,
  createGetServerSideProps,
} from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { pageStarted } from './model'

export interface Props {
  description: string
}

export const AboutPage: NextPageWithLayout<Props> = ({ description }) => {
  console.info('AboutPage: render')
  const user = useStore($authenticatedUser)

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

// TODO: make createGetStaticProps fabric
export const getStaticProps = createGetServerSideProps({
  pageEvent: pageStarted,
  create: () => async () => {
    return {
      props: {
        description:
          'Some SSG website description with revalidate each 10 sec, result is ' +
          Math.random(),
      },
      revalidate: 10, // In seconds
    }
  },
})
