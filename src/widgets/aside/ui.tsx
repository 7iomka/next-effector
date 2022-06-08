import { useStore } from 'effector-react'
import { $customInfo } from './model'

export function Aside() {
  const customInfo = useStore($customInfo)

  return (
    <aside className="p-5 bg-slate-500 text-yellow-200">{customInfo}</aside>
  )
}
