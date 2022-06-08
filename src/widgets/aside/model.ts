import { attach, createEvent, restore, sample } from 'effector'
import { localApi } from '@/shared/api'

const loadCustomInfoFx = attach({ effect: localApi.getCustomInfoFx })

export const asideBooted = createEvent()

export const $customInfo = restore(loadCustomInfoFx, null)

sample({
  clock: asideBooted,
  target: loadCustomInfoFx,
})
