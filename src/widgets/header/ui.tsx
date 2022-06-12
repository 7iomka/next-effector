import clsx from 'clsx'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { $authenticatedUser } from '@/entities/authenticated-user'
import { paths } from '@/shared/routing'
import styles from './styles.module.css'

interface Route {
  title: string
  path: string
}

const routes: Route[] = [
  {
    title: 'Home (GIP)',
    path: paths.home(),
  },
  {
    title: 'My Profile (GIP)',
    path: paths.me(),
  },
  {
    title: 'About (SSG)',
    path: paths.about(),
  },
  {
    title: 'Account (GIP)',
    path: paths.account(),
  },
  {
    title: 'Account Inner (GIP)',
    path: paths.accountInner(),
  },
]

export function Header() {
  const user = useStore($authenticatedUser)
  const router = useRouter()

  return (
    <header className={styles.header}>
      <Link href={paths.home()} passHref>
        <a className={clsx([styles.navlink, styles.logo])} href="_">
          Effector + Next.js
        </a>
      </Link>
      <nav className={styles.navbar}>
        {routes.map((route) => (
          <Link key={route.path} href={route.path} passHref>
            <a
              className={clsx(
                styles.navlink,
                route.path === router.pathname && styles.navlinkActive
              )}
              href="_"
            >
              {route.title}
            </a>
          </Link>
        ))}
      </nav>
      {user && (
        <Link href={paths.me()} passHref>
          <a className={styles.navlink} href="_">
            Welcome, {user.firstName}!
          </a>
        </Link>
      )}
    </header>
  )
}
