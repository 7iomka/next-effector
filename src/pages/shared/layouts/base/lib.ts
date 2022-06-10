import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
} from '@/shared/lib/effector'
import { baseLayoutBooted } from './model'

export const createGetInitialProps = createAppGetInitialProps({
  sharedEvents: [baseLayoutBooted],
})

export const createGetServerSideProps = createAppGetServerSideProps({
  sharedEvents: [baseLayoutBooted],
})
