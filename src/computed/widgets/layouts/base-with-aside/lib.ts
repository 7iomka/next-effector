import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
} from '@/shared/lib/effector'
import { baseLayoutWithAsideBooted } from './model'

export const createGetInitialProps = createAppGetInitialProps({
  appEvents: [baseLayoutWithAsideBooted], // or direct list if we won't use `merge`
})

export const createGetServerSideProps = createAppGetServerSideProps({
  appEvents: [baseLayoutWithAsideBooted],
})
