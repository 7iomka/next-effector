import { attach, createEvent, restore, sample } from 'effector'
import { localApi } from '@/shared/api'

const loadCopyFx = attach({ effect: localApi.getCopyFx })

export const footerBooted = createEvent()
footerBooted.watch((v) => console.log('footerBooted called'))

export const $copy = restore(loadCopyFx, null)

sample({
  clock: footerBooted,
  target: loadCopyFx,
})
