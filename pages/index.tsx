import { NextPage } from 'next'
import { HomePage, pageStarted } from '@app/pages/home'
import { createGetInitialProps } from '@app/pages/shared'

const Page: NextPage = () => {
  return <HomePage />
}

Page.Layout = HomePage.Layout

Page.getInitialProps = createGetInitialProps({ pageEvent: pageStarted })

export default Page
