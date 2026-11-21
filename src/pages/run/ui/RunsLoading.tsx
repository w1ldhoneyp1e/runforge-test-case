import styles from '../../../shared/styles/styles.module.css'

function RunsLoading() {
	return (
		<div
			className={`${styles.panel} ${styles.loading}`}
			aria-live="polite"
		>
			<span className={styles.spinner} />
			{"Loading runs…"}
		</div>
	)
}

export {
	RunsLoading,
}
