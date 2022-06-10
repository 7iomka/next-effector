import { attach, createEvent, restore, sample } from 'effector'
import { localApi } from '@/shared/api'

export const pageStarted = createEvent()

const loadBioFx = attach({ effect: localApi.getBioFx })

export const $bio = restore(loadBioFx, null)

sample({
  clock: pageStarted,
  target: loadBioFx,
})
