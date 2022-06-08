import { NextPage } from 'next'
import NextErrorPage from 'next/error'
import { AccountPage } from '@/pages/account'

interface Props {
  notFound?: boolean
}

const Page: NextPage<Props> = ({ notFound }) => {
  if (notFound) {
    return <NextErrorPage statusCode={404} />
  }

  return <AccountPage />
}

Page.Layout = AccountPage.Layout
Page.getInitialProps = AccountPage.getInitialProps

export default Page
