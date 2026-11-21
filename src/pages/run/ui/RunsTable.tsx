import styles from '../../../shared/styles/styles.module.css'
import {RunStatusBadge} from './RunStatus'
import type {RunView} from '../viewmodel/useRunsViewModel'

interface RunsTableProps {
	runs: RunView[]
	onOpen: (id: string) => void
}

function RunsTable({runs, onOpen}: RunsTableProps) {
	return (
		<div className={styles['runs-list']}>
			<div className={styles['runs-columns']}>
				<span>{"Run"}</span>
				<span>{"Repository"}</span>
				<span>{"Status"}</span>
				<span>{"Created"}</span>
				<span>{"Duration"}</span>
			</div>
			{runs.map((run) => (
				<button
					key={run.id}
					className={styles['run-row']}
					onClick={() => onOpen(run.id)}
					aria-label={`Open ${run.name}`}
				>
					<span className={styles['run-name']}>
						<i className={`${styles['run-dot']} ${styles[run.status]}`} />
						{run.name}
					</span>
					<span className={styles['run-repository']}>
						{run.repository}
						<small>{run.branch}</small>
					</span>
					<RunStatusBadge status={run.status} />
					<span>{run.createdAt}</span>
					<span>{run.duration}</span>
				</button>
			))}
		</div>
	)
}

export {
	RunsTable,
}
