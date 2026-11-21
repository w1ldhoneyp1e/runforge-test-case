import styles from '../../shared/styles/styles.module.css'
import type {ReactNode} from 'react'
import {AppSidebar} from '../../widgets/app-sidebar/AppSidebar'

interface AppLayoutProps {
	children: ReactNode
}

function AppLayout({children}: AppLayoutProps) {
	return (
		<div className={styles['app-shell']}>
			<AppSidebar />
			<main className={styles['page-content']}>{children}</main>
		</div>
	)
}

export {
	AppLayout,
}
