import type {RunDto} from './dto'
import type {Run} from '../model/types'
import {mapRunDto} from './mapper'

const runs: RunDto[] = [
	{
		id: 'run_long_logs',
		name: 'Run full integration suite',
		repository: 'web-platform',
		branch: 'test/integration-suite',
		status: 'succeeded',
		createdAt: '2026-11-21T09:20:00Z',
		durationSeconds: 912,
		logs: Array.from({length: 240}, (_, index) => `Step ${String(index + 1).padStart(3, '0')}  Integration check passed`),
		result: 'All 240 integration checks passed.',
	},
	{
		id: 'run_8kf21',
		name: 'Auth refactor',
		repository: 'web-platform',
		branch: 'feature/auth-cookies',
		status: 'running',
		createdAt: '2026-11-21T08:42:00Z',
		logs: ['08:42:03  Cloning repository',
			'08:42:19  Installing dependencies',
			'08:43:04  Agent is reviewing auth middleware'],
	},
	{
		id: 'run_9ma77',
		name: 'Fix checkout tests',
		repository: 'payments',
		branch: 'fix/checkout-e2e',
		status: 'succeeded',
		createdAt: '2026-11-21T07:16:00Z',
		durationSeconds: 408,
		logs: ['07:16:12  Workspace ready',
			'07:20:38  Updated flaky selector',
			'07:22:48  18 tests passed'],
		result: 'Checkout test suite is stable. Updated selectors and removed a timing race.',
	},
	{
		id: 'run_3dx44',
		name: 'Update dependencies',
		repository: 'api-service',
		branch: 'chore/deps-november',
		status: 'queued',
		createdAt: '2026-11-21T09:05:00Z',
		logs: ['09:05:00  Run queued', '09:05:01  Waiting for an isolated runtime'],
	},
	{
		id: 'run_2pv08',
		name: 'Repair webhook retries',
		repository: 'integrations',
		branch: 'fix/retry-policy',
		status: 'failed',
		createdAt: '2026-11-20T16:34:00Z',
		durationSeconds: 181,
		logs: ['16:34:10  Starting investigation',
			'16:35:44  Running integration tests',
			'16:37:11  Error: Redis connection refused'],
		result: 'Run stopped because the local Redis container was unavailable.',
	},
	{
		id: 'run_6wb12',
		name: 'Document API pagination',
		repository: 'developer-portal',
		branch: 'docs/pagination',
		status: 'succeeded',
		createdAt: '2026-11-20T13:20:00Z',
		durationSeconds: 96,
		logs: ['13:20:04  Reading API routes',
			'13:21:32  Documentation generated',
			'13:21:40  Changes committed'],
		result: 'Added pagination examples to the REST API guide.',
	},
	{
		id: 'run_1ny59',
		name: 'Audit database indexes',
		repository: 'data-platform',
		branch: 'agent/index-audit',
		status: 'running',
		createdAt: '2026-11-21T08:59:00Z',
		logs: ['08:59:02  Connecting to schema snapshot', '09:00:15  Analysing query plans'],
	},
	{
		id: 'run_4qt90',
		name: 'Prepare release notes',
		repository: 'web-platform',
		branch: 'release/1.8',
		status: 'queued',
		createdAt: '2026-11-21T09:11:00Z',
		logs: ['09:11:00  Run requested', '09:11:01  Added to worker queue'],
	},
]

async function getRuns(): Promise<Run[]> {
	await new Promise((resolve) => setTimeout(resolve, 650))
	return runs.map(mapRunDto)
}

export {
	getRuns,
}
