import { NextPage } from 'next'
import NextErrorPage from 'next/error'
import { AccountInnerPage } from '@/pages/account-inner'

interface Props {
  notFound?: boolean
}

const Page: NextPage<Props> = ({ notFound }) => {
  if (notFound) {
    return <NextErrorPage statusCode={404} />
  }

  return <AccountInnerPage />
}

Page.Layout = AccountInnerPage.Layout
Page.getInitialProps = AccountInnerPage.getInitialProps

export default Page
