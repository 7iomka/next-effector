/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
import '@fontsource/acme'
import '@fontsource/fira-mono'
import '@/shared/ui/globals.css'
import type { AppProps } from 'next/app'
import { AppType } from 'next/dist/shared/lib/utils'
import { withEffector } from '@/shared/lib/effector'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout // see next-custom.d.ts
}
// @ts-ignore: TODO: fix withEffector typings when App has customized type
const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />)

  return <Component {...pageProps} />
}
// @ts-ignore: TODO: fix withEffector typings when App has customized type
export default withEffector(MyApp)
