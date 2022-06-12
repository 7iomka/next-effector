import { createEvent } from 'effector'

export const headerBooted = createEvent()

headerBooted.watch((v) => console.log('headerBooted called'))
