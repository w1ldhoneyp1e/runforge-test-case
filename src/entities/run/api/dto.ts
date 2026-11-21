import type {RunStatus} from '../model/types'

type RunDto = {
	id: string;
	name: string;
	repository: string;
	branch: string;
	status: RunStatus
	createdAt: string;
	durationSeconds?: number;
	logs: string[];
	result?: string
}

export type {
	RunDto,
}
