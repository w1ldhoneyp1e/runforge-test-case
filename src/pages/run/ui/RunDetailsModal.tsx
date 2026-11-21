import styles from '../../../shared/styles/styles.module.css'
import type {Run} from '../../../entities/run'
import {
	formatDate,
	formatDuration,
} from '../../../shared/lib/format'
import {Modal} from '../../../shared/ui'
import {RunStatusBadge} from './RunStatus'
import {RunLogs} from './RunLogs'

interface RunDetailsModalProps {
	run: Run | null
	onClose: () => void
}

function RunDetailsModal({run, onClose}: RunDetailsModalProps) {
	return (
		<Modal
			open={Boolean(run)}
			onClose={onClose}
			title={run?.name ?? 'Run details'}
		>
			{run && (
				<div className={styles['run-details']}>
					<div className={styles['detail-title']}>
						<p>
							{run.repository} <span>{"·"}</span> {run.branch}
						</p>
						<RunStatusBadge status={run.status} />
					</div>
					<dl>
						<div>
							<dt>{"Run ID"}</dt>
							<dd>{run.id}</dd>
						</div>
						<div>
							<dt>{"Created"}</dt>
							<dd>{formatDate(run.createdAt)}</dd>
						</div>
						<div>
							<dt>{"Duration"}</dt>
							<dd>{formatDuration(run.durationSeconds)}</dd>
						</div>
					</dl>
					<RunLogs
						key={run.id}
						logs={run.logs}
					/>
					{run.result && (
						<section>
							<h3>{"Result"}</h3>
							<p className={styles.result}>{run.result}</p>
						</section>
					)}
				</div>
			)}
		</Modal>
	)
}

export {
	RunDetailsModal,
}
