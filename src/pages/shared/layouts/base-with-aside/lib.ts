import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
} from '@/shared/lib/effector'
import { baseLayoutWithAsideBooted } from './model'

export const createGetInitialProps = createAppGetInitialProps({
  sharedEvents: [baseLayoutWithAsideBooted],
})

export const createGetServerSideProps = createAppGetServerSideProps({
  sharedEvents: [baseLayoutWithAsideBooted],
})
