import type {
	Run,
	RunStatus,
} from '../../../entities/run'

type StatusFilter = 'all' | RunStatus
type SortOption = 'created-desc' | 'created-asc' | 'duration-desc' | 'duration-asc'

const statusFilters: {
	value: StatusFilter;
	label: string
}[] = [
	{
		value: 'all',
		label: 'All',
	},
	{
		value: 'queued',
		label: 'Queued',
	},
	{
		value: 'running',
		label: 'Running',
	},
	{
		value: 'succeeded',
		label: 'Succeeded',
	},
	{
		value: 'failed',
		label: 'Failed',
	},
]

function filterRuns(runs: Run[], search: string, status: StatusFilter): Run[] {
	const query = search.trim().toLowerCase()

	return runs.filter((run) => (
		(status === 'all' || run.status === status)
    	&& (!query || run.name.toLowerCase().includes(query) || run.repository.toLowerCase().includes(query))
	))
}

function sortRuns(runs: Run[], sort: SortOption): Run[] {
	const direction = sort.endsWith('desc') ? -1 : 1

	return [...runs].sort((first, second) => {
		const value = sort.startsWith('created')
			? first.createdAt.getTime() - second.createdAt.getTime()
			: (first.durationSeconds ?? -1) - (second.durationSeconds ?? -1)

		return value * direction
	})
}

export {
	filterRuns,
	sortRuns,
	statusFilters,
}
export type {
	SortOption,
	StatusFilter,
}
