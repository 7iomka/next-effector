import { createEvent, sample } from 'effector'
import { enhancePageEvent } from '@/shared/lib/effector'
import { asideBooted } from '@/widgets/aside'
import { baseLayoutBooted, baseLayoutStaticBooted } from '../base/model'

export const baseLayoutWithAsideBooted = createEvent()
export const baseLayoutWithAsideStaticBooted = createEvent()

const enchancedEvents = [asideBooted].map((event) =>
  enhancePageEvent(event, { runOnce: true })
)

// Get common data for SSR/GIP only pages
sample({
  clock: [baseLayoutWithAsideBooted],
  target: [baseLayoutBooted, ...enchancedEvents],
})

// Get common data for SSG only pages
sample({
  clock: [baseLayoutWithAsideStaticBooted],
  target: [baseLayoutStaticBooted, ...enchancedEvents],
})

// For SSG - use `usePageEvent(baseLayoutWithAsideBooted)`
