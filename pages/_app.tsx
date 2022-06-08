/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/acme'
import '@fontsource/fira-mono'
import '@/shared/ui/globals.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ElementType, Fragment } from 'react'
import { withEffector } from '@/shared/lib/effector'

type NextPageWithLayout = NextPage & {
  // getLayout?: (page: ReactElement) => ReactNode
  Layout?: ElementType
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const PageLayout = Component.Layout ?? Fragment

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
  // // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout ?? ((page) => page)

  // // eslint-disable-next-line react/jsx-props-no-spreading
  // return getLayout(<Component {...pageProps} />)
}

export default withEffector(MyApp)
