import {
  createAppGetInitialProps,
  createAppGetServerSideProps,
  createAppGetStaticProps,
  usePageEvent,
} from '@/shared/lib/effector'
import {
  baseLayoutWithAsideBooted,
  baseLayoutWithAsideStaticBooted,
} from './model'

export const createGetInitialProps = createAppGetInitialProps({
  sharedEvents: [baseLayoutWithAsideBooted],
})

export const createGetServerSideProps = createAppGetServerSideProps({
  sharedEvents: [baseLayoutWithAsideBooted],
})

export const createGetStaticProps = createAppGetStaticProps({
  sharedEvents: [baseLayoutWithAsideStaticBooted],
})

export const useLayoutEvent = () =>
  usePageEvent(baseLayoutWithAsideBooted, {
    runOnce: true,
  })
