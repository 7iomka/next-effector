import { createEvent, sample } from 'effector'
import { loadAuthenticatedUser } from '@/entities/authenticated-user'
import { enhancePageEvent } from '@/shared/lib/effector'
import { footerBooted } from '@/widgets/footer'
import { headerBooted } from '@/widgets/header'

export const baseLayoutBooted = createEvent()
export const baseLayoutStaticBooted = createEvent()

// Get shared (public) data for all SSR/GIP pages
sample({
  clock: baseLayoutBooted,
  // Events fired once, regardless of the repeated clock's call
  // Required, because inside SSG pages we call clientside the same event with goal to get private data
  target: [headerBooted, footerBooted].map((event) =>
    enhancePageEvent(event, { runOnce: true })
  ),
})

// Get shared (public) data for all SSG pages
sample({
  clock: baseLayoutStaticBooted,
  target: [headerBooted, footerBooted],
})

// Get shared (private) data for SSR/GIP only pages
sample({
  clock: baseLayoutBooted,
  target: [loadAuthenticatedUser],
})
// For SSG - use `usePageEvent(baseLayoutBooted)`
