import {Button} from '../../../shared/ui'
import styles from '../../../shared/styles/styles.module.css'

function RunsEmptyState({onReset}: {onReset: () => void}) {
	return (
		<div className={`${styles.state} ${styles.empty}`}>
			<h2>{"No runs found"}</h2>
			<p>{"Try a different search or clear your active filters."}</p>
			<Button onClick={onReset}>{"Clear filters"}</Button>
		</div>
	)
}

export {
	RunsEmptyState,
}
