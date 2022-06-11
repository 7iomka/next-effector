/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import type { ReactElement } from 'react'

declare global {
  export declare type NextLayoutGetter = (page: ReactElement) => JSX.Element

  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: NextLayoutGetter
  }
}

// declare module 'next' {
//   export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//     getLayout?: NextLayoutGetter
//   }
// }

// declare module 'next/app' {
//   type AppLayoutProps<P = {}> = AppProps<P> & {
//     Component: NextPageWithLayout
//   }
// }
