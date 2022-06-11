import { createEvent, sample } from 'effector'
import { PageEvent, StaticPageEvent } from '@/shared/lib/effector'
import { footerBooted } from '@/widgets/footer'
import { headerBooted } from '@/widgets/header'

export const baseLayoutBooted: PageEvent = createEvent()
export const baseLayoutStaticBooted: StaticPageEvent = createEvent()

// Get common data for all (SSG + SSR / GIP) pages
sample({
  clock: [baseLayoutBooted, baseLayoutStaticBooted],
  target: [headerBooted, footerBooted],
})

// // Get common data for SSR/GIP only pages
// sample({
//   clock: baseLayoutBooted,
//   target: [authDataRequested],
// })

// // Get common data for SSG only pages
// sample({
//   clock: baseLayoutStaticBooted,
//   target: [authDataRequested],
// })
