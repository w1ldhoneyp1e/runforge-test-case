import {RunforgeIcon} from '../../shared/icons/RunforgeIcon'
import styles from './AppSidebar.module.css'

function AppSidebar() {
	return (
		<aside
			className={styles.sidebar}
			aria-label="Application navigation"
		>
			<a
				className={styles.brand}
				href="#runs"
				aria-label="Runforge Runs"
			>
				<RunforgeIcon
					className={styles.logo}
					aria-hidden="true"
				/>
				<span className={styles.brandText}>
					<strong>{"Runforge"}</strong>
					<small>{"control plane"}</small>
				</span>
			</a>
			<nav
				className={styles.navigation}
				aria-label="Primary navigation"
			>
				<a
					className={styles.activeLink}
					href="#runs"
					aria-current="page"
				>
					<span
						className={styles.runIcon}
						aria-hidden="true"
					>{"◉"}</span>
					{"Runs"}
				</a>
			</nav>
			<div className={styles.user}>
				<span
					className={styles.avatar}
					aria-hidden="true"
				>{"JL"}</span>
				<span className={styles.userText}>
					<strong>{"Jordan Lee"}</strong>
					<small>{"Developer"}</small>
				</span>
			</div>
		</aside>
	)
}

export {
	AppSidebar,
}
