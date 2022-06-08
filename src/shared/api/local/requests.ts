import { createRequest } from './request'
import { Bio, Copy, User } from './types'

export const getMeFx = createRequest<void, User | null>({
  username: 'risen',
  firstName: 'Evgeny',
  lastName: 'Rampage',
})

export const getBioFx = createRequest<void, Bio | null>({
  birthDate: new Date().toISOString(),
  occupation: 'No occupation, just visiting',
})

export const getCopyFx = createRequest<void, Copy | null>(
  'Loaded copyright (kek)'
)

export const getCustomInfoFx = createRequest<void, string | null>('Custom info')
