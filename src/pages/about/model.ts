import { createEffect, createEvent, restore, sample } from 'effector'
import { StaticPageContext } from '@/shared/lib/effector'

export const pageStarted = createEvent<StaticPageContext>()

const createDescriptionFx = createEffect(() => 'Static Page Description')

export const $description = restore(createDescriptionFx, null)

sample({
  clock: pageStarted,
  target: createDescriptionFx,
})
