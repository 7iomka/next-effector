/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/acme'
import '@fontsource/fira-mono'
import '@/shared/ui/globals.css'
import type { AppProps } from 'next/app'
import { withEffector } from '@/shared/lib/effector'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout // see next-custom.d.ts
}
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />)

  return <Component {...pageProps} />
}

export default withEffector(MyApp)
