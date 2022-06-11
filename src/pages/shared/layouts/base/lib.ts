import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
  createAppGetStaticProps,
} from '@/shared/lib/effector'
import { baseLayoutBooted, baseLayoutStaticBooted } from './model'

export const createGetInitialProps = createAppGetInitialProps({
  sharedEvents: [baseLayoutBooted],
})

export const createGetServerSideProps = createAppGetServerSideProps({
  sharedEvents: [baseLayoutBooted],
})

export const createGetStaticProps = createAppGetStaticProps({
  sharedEvents: [baseLayoutStaticBooted],
})
