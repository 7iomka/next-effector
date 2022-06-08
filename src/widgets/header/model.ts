import { createEvent, sample } from 'effector'
import { loadAuthenticatedUser } from '@/entities/authenticated-user'

export const headerBooted = createEvent()

sample({
  clock: headerBooted,
  target: [loadAuthenticatedUser],
})
