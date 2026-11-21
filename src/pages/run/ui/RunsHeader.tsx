import styles from '../../../shared/styles/styles.module.css'

function RunsHeader() {
	return (
		<div className={styles['runs-head']}>
			<div>
				<h1>{"Runs"}</h1>
				<p className={styles.subtitle}>{"Track your AI agents, inspect results, and resolve issues."}</p>
			</div>
		</div>
	)
}

export {
	RunsHeader,
}
