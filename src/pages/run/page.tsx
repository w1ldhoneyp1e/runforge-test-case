import styles from '../../shared/styles/styles.module.css'
import {
	RunsViewModelProvider,
	useRunsViewModelContext,
} from './context/RunsViewModelContext'
import {RunDetailsModal} from './ui/RunDetailsModal'
import {RunsEmptyState} from './ui/RunsEmptyState'
import {RunsError} from './ui/RunsError'
import {RunsHeader} from './ui/RunsHeader'
import {RunsLoading} from './ui/RunsLoading'
import {RunsTable} from './ui/RunsTable'
import {RunsToolbar} from './ui/RunsToolbar'
import type {RunsViewModel} from './viewmodel/useRunsViewModel'

interface RunsBodyProps {
	viewModel: RunsViewModel
}

function RunsBody({viewModel}: RunsBodyProps) {
	if (viewModel.isLoading) {
		return <RunsLoading />
	}
	
	if (viewModel.error) {
		return <RunsError
			message={viewModel.error}
			onRetry={viewModel.retry}
		/>
	}

	return (
		<>
			<RunsToolbar
				search={viewModel.search}
				status={viewModel.status}
				sort={viewModel.sort}
				onSearch={viewModel.setSearch}
				onStatus={viewModel.setStatus}
				onSort={viewModel.setSort}
			/>
			<section className={`${styles.panel} ${styles['runs-panel']}`}>
				{viewModel.visibleRuns.length
					? <RunsTable
							runs={viewModel.visibleRuns}
							onOpen={viewModel.openDetails}
					/>
					: <RunsEmptyState onReset={viewModel.resetFilters} />}
			</section>
		</>
	)
}

function RunsPageContent() {
	const viewModel = useRunsViewModelContext()

	return (
		<section
			id="runs"
			className={styles['runs-page']}
		>
			<RunsHeader />
			<RunsBody viewModel={viewModel}/>
			<RunDetailsModal
				run={viewModel.selectedRun}
				onClose={viewModel.closeDetails}
			/>
		</section>
	)
}

function RunsPage() {
	return (
		<RunsViewModelProvider>
			<RunsPageContent />
		</RunsViewModelProvider>
	)
}

export {
	RunsPage,
}
