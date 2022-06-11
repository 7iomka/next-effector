import { createEvent, sample } from 'effector'
import { PageEvent, StaticPageEvent } from '@/shared/lib/effector'
import { asideBooted } from '@/widgets/aside'
import { baseLayoutBooted, baseLayoutStaticBooted } from '../base/model'

export const baseLayoutWithAsideBooted: PageEvent = createEvent()
export const baseLayoutWithAsideStaticBooted: StaticPageEvent = createEvent()

// Get common data for all (SSG + SSR / GIP) pages
sample({
  clock: [baseLayoutWithAsideBooted, baseLayoutWithAsideStaticBooted],
  target: [baseLayoutBooted, baseLayoutStaticBooted, asideBooted],
})

// // Get common data for SSR/GIP only pages
// sample({
//   clock: baseLayoutWithAsideBooted,
//   target: [authDataRequested],
// })

// // Get common data for SSG only pages
// sample({
//   clock: baseLayoutWithAsideStaticBooted,
//   target: [authDataRequested],
// })
