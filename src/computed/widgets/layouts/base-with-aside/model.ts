import { createEvent, sample } from 'effector'
import { asideBooted } from '@/widgets/aside'
import { baseLayoutBooted } from '../base/model'

export const baseLayoutWithAsideBooted = createEvent()

sample({
  clock: baseLayoutWithAsideBooted,
  target: [baseLayoutBooted, asideBooted],
})
