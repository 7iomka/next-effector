import { attach, createEvent, restore, sample } from 'effector'
import { localApi } from '@/shared/api'

const loadMeFx = attach({ effect: localApi.getMeFx })

export const loadAuthenticatedUser = createEvent()

loadAuthenticatedUser.watch(() => console.log('loadAuthenticatedUser called'))
export const $authenticatedUser = restore(loadMeFx, null)

sample({
  clock: loadAuthenticatedUser,
  target: loadMeFx,
})
