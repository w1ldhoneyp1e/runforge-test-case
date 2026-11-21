type RunStatus = 'queued' | 'running' | 'succeeded' | 'failed'

type Run = {
	id: string
	name: string
	repository: string
	branch: string
	status: RunStatus
	createdAt: Date
	durationSeconds?: number
	logs: string[]
	result?: string
}

export type {
	RunStatus,
	Run,
}
