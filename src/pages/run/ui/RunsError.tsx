import {Button} from '../../../shared/ui'
import styles from '../../../shared/styles/styles.module.css'

function RunsError({message, onRetry}: {
	message: string;
	onRetry: () => void
}) {
	return (
		<div className={`${styles.panel} ${styles.state}`}>
			<h2>{"Something went wrong"}</h2>
			<p>{message}</p>
			<Button onClick={onRetry}>{"Try again"}</Button>
		</div>
	)
}

export {
	RunsError,
}
