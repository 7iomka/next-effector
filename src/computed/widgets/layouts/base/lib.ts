import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
} from '@/shared/lib/effector'
import { baseLayoutBooted } from './model'

export const createGetInitialProps = createAppGetInitialProps({
  appEvents: [baseLayoutBooted],
})

export const createGetServerSideProps = createAppGetServerSideProps({
  appEvents: [baseLayoutBooted],
})
