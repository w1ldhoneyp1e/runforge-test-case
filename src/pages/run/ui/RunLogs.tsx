import {useState} from 'react'
import {CopyIcon} from '../../../shared/icons/CopyIcon'
import styles from './RunLogs.module.css'

function RunLogs({logs}: {logs: string[]}) {
	const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')

	async function copyLogs() {
		try {
			await navigator.clipboard.writeText(logs.join('\n'))
			setCopyStatus('copied')
		} catch {
			setCopyStatus('error')
		}
	}

	return (
		<section className={styles.section}>
			<div className={styles.heading}>
				<h3>{"Logs"}</h3>
				<div className={styles.actions}>
					<span
						className={styles.message}
						aria-live="polite"
					>
						{copyStatus === 'copied' && 'Copied'}
						{copyStatus === 'error' && 'Could not copy logs'}
					</span>
					<button
						type="button"
						className={styles.copyButton}
						aria-label="Copy logs"
						title="Copy logs"
						onClick={copyLogs}
					>
						<CopyIcon aria-hidden="true" />
					</button>
				</div>
			</div>
			<pre
				className={styles.logs}
				tabIndex={0}
				aria-label="Run logs"
			>{logs.join('\n')}</pre>
		</section>
	)
}

export {
	RunLogs,
}
