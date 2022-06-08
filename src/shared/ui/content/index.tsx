import { ReactNode } from 'react'
import styles from './content.module.css'

export const Content = ({ children }: { children: ReactNode }) => {
  return <main className={styles.content}> {children} </main>
}
