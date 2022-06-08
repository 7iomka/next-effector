import { GetStaticProps, NextPage } from 'next'
import { AboutPage } from '@/pages/about'
// import { appStarted } from '@/pages/shared/model'
// import { useClientAppEvent } from '@/shared/lib/effector'

interface Props {
  content: string
}

const Page: NextPage<Props> = ({ content }) => {
  console.info('AboutPage: render')
  // useClientAppEvent(appStarted)
  return <AboutPage content={content} />
}

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    content: 'Some static website description',
  },
})

Page.Layout = AboutPage.Layout

export default Page
