import { useStore } from 'effector-react/scope'
import {
  BaseLayout,
  createGetStaticProps,
  useLayoutEvent,
} from '@/pages/shared/layouts/base'
import { Content } from '@/shared/ui/content'
import { Title } from '@/shared/ui/title'
import { $description, pageStarted } from './model'

export interface Props {
  customText: string
}

export const AboutPage: NextPageWithLayout<Props> = ({ customText }) => {
  console.info('AboutPage: render')
  useLayoutEvent()
  const description = useStore($description) // from page model

  return (
    <>
      <Title>About</Title>
      <Content>
        <div>
          <h3>This page is SSG</h3>
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
        customText: 'Some SSG page custom text',
      },
      // revalidate: 10, // In seconds
    }
  },
})
