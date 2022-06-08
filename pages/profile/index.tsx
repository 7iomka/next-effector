import { NextPage } from 'next'
import NextErrorPage from 'next/error'
import { MyProfilePage } from '@/pages/my-profile'

interface Props {
  notFound?: boolean
}

const Page: NextPage<Props> = ({ notFound }) => {
  if (notFound) {
    return <NextErrorPage statusCode={404} />
  }

  return <MyProfilePage />
}

Page.getInitialProps = MyProfilePage.getInitialProps

Page.Layout = MyProfilePage.Layout

export default Page
