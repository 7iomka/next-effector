import { useStore } from 'effector-react'
import { $copy } from './model'

export function Footer() {
  const copy = useStore($copy)

  return <footer>{copy}</footer>
}
