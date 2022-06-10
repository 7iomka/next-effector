import { createEvent } from 'effector'
import { SharedNextContext } from '@/shared/lib/effector'

export const pageStarted = createEvent<SharedNextContext>()
