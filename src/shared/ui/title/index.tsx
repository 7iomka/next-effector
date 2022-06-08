import { ReactNode } from 'react'
import styles from './title.module.css'

export const Title = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.title}>{children}</h2>
}
