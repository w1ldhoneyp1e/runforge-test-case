import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import {
	getRuns,
	type Run,
	type RunStatus,
} from '../../../entities/run'
import {
	formatDate,
	formatDuration,
} from '../../../shared/lib/format'
import {
	filterRuns,
	sortRuns,
	type SortOption,
	type StatusFilter,
} from './utils'

interface RunView {
	id: string
	name: string
	repository: string
	branch: string
	status: RunStatus
	createdAt: string
	duration: string
	raw: Run
}

interface RunsViewModel {
	isLoading: boolean
	error: string | null
	retry: () => Promise<void>
	search: string
	setSearch: (value: string) => void
	status: StatusFilter
	setStatus: (value: StatusFilter) => void
	sort: SortOption
	setSort: (value: SortOption) => void
	visibleRuns: RunView[]
	selectedRun: Run | null
	openDetails: (id: string) => void
	closeDetails: () => void
	resetFilters: () => void
}

function readStatusFromUrl(): StatusFilter {
	const value = new URLSearchParams(window.location.search).get('status')

	return value === 'queued' || value === 'running' || value === 'succeeded' || value === 'failed'
		? value
		: 'all'
}

function useRunsViewModel(): RunsViewModel {
	const [runs, setRuns] = useState<Run[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [search, setSearch] = useState('')
	const [status, setStatusState] = useState<StatusFilter>(readStatusFromUrl)
	const [sort, setSort] = useState<SortOption>('created-desc')
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null)

	const load = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		try {
			setRuns(await getRuns())
		} catch {
			setError('Could not load runs. Check your connection and try again.')
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		void load()
	}, [load])

	useEffect(() => {
		const onPopState = () => setStatusState(readStatusFromUrl())

		window.addEventListener('popstate', onPopState)

		return () => window.removeEventListener('popstate', onPopState)
	}, [])

	const setStatus = useCallback((next: StatusFilter) => {
		setStatusState(next)

		const url = new URL(window.location.href)

		if (next === 'all') url.searchParams.delete('status')
		else url.searchParams.set('status', next)

		window.history.pushState({}, '', url)
	}, [])

	const visibleRuns = useMemo(() => (
		sortRuns(filterRuns(runs, search, status), sort).map((run): RunView => ({
			...run,
			createdAt: formatDate(run.createdAt),
			duration: formatDuration(run.durationSeconds),
			raw: run,
		}))
	), [runs,
		search,
		status,
		sort])
	const selectedRun = useMemo(
		() => runs.find((run) => run.id === selectedRunId) ?? null,
		[runs, selectedRunId],
	)
	const resetFilters = () => {
		setSearch('')
		setStatus('all')
	}

	return {
		isLoading,
		error,
		retry: load,
		search,
		setSearch,
		status,
		setStatus,
		sort,
		setSort,
		visibleRuns,
		selectedRun,
		openDetails: setSelectedRunId,
		closeDetails: () => setSelectedRunId(null),
		resetFilters,
	}
}

export {
	useRunsViewModel,
}
export type {
	RunsViewModel,
	RunView,
}
