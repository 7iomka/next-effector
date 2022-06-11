import { createEvent } from 'effector'
import { PageContext } from '@/shared/lib/effector'

export const pageStarted = createEvent<PageContext>()
