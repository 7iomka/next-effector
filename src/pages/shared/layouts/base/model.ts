import { createEvent, sample } from 'effector'
import { footerBooted } from '@/widgets/footer'
import { headerBooted } from '@/widgets/header'

export const baseLayoutBooted = createEvent()

sample({
  clock: baseLayoutBooted,
  target: [headerBooted, footerBooted],
})
