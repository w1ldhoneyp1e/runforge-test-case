import {
	describe,
	expect,
	it,
} from 'vitest'
import type {Run} from '../../../entities/run'
import {
	filterRuns,
	sortRuns,
} from '../viewmodel/utils'

function makeRun(overrides: Partial<Run> = {}): Run {
	return {
		id: '1',
		name: 'Auth work',
		repository: 'platform',
		branch: 'main',
		status: 'queued',
		createdAt: new Date('2026-01-01'),
		logs: [],
		...overrides,
	}
}

describe('run utilities', () => {
	it('combines status filtering and search', () => {
		const runs = [
			makeRun(),
			makeRun({
				id: '2',
				name: 'Fix tests',
				repository: 'payments',
				status: 'succeeded',
			}),
		]

		expect(filterRuns(runs, 'payment', 'succeeded')).toHaveLength(1)
		expect(filterRuns(runs, 'payment', 'queued')).toHaveLength(0)
	})

	it('sorts by date and duration without changing input', () => {
		const first = makeRun({
			id: 'first',
			createdAt: new Date('2026-01-01'),
			durationSeconds: 50,
		})
		const second = makeRun({
			id: 'second',
			createdAt: new Date('2026-01-02'),
			durationSeconds: 10,
		})

		expect(sortRuns([first, second], 'created-desc').map((run) => run.id)).toEqual(['second', 'first'])
		expect(sortRuns([first, second], 'duration-asc').map((run) => run.id)).toEqual(['second', 'first'])
	})
})
