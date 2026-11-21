import type {RunStatus} from '../../../entities/run'
import styles from '../../../shared/styles/styles.module.css'

const labels: Record<RunStatus, string> = {
	queued: 'queued',
	running: 'running',
	succeeded: 'completed',
	failed: 'failed',
}

function RunStatusBadge({status}: {status: RunStatus}) {
	return (
		<span className={`${styles.status} ${styles[status]}`}>
			<i />
			{labels[status]}
		</span>
	)
}

export {
	RunStatusBadge,
}
