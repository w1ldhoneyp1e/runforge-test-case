import styles from '../../../shared/styles/styles.module.css'
import {
	Input,
	Select,
} from '../../../shared/ui'
import {
	statusFilters,
	type SortOption,
	type StatusFilter,
} from '../viewmodel/utils'

interface RunsToolbarProps {
	search: string
	status: StatusFilter
	sort: SortOption
	onSearch: (value: string) => void
	onStatus: (value: StatusFilter) => void
	onSort: (value: SortOption) => void
}

const sortOptions: {
	value: SortOption;
	label: string
}[] = [
	{
		value: 'created-desc',
		label: 'Newest first',
	},
	{
		value: 'created-asc',
		label: 'Oldest first',
	},
	{
		value: 'duration-desc',
		label: 'Duration: long',
	},
	{
		value: 'duration-asc',
		label: 'Duration: short',
	},
]

function RunsToolbar({
	search,
	status,
	sort,
	onSearch,
	onStatus,
	onSort,
}: RunsToolbarProps) {
	return (
		<section
			className={styles['toolbar']}
			aria-label="Run controls"
		>
			<label className={styles['search']}>
				<span aria-hidden="true">{"⌕"}</span>
				<Input
					value={search}
					onChange={(event) => onSearch(event.target.value)}
					placeholder="Search runs or repositories"
					aria-label="Search runs or repositories"
				/>
			</label>
			<div className={styles['select-label']}>
				<span>{"Status"}</span>
				<Select
					value={status}
					options={statusFilters}
					onChange={onStatus}
					label="Filter by status"
				/>
			</div>
			<div className={styles['select-label']}>
				<span>{"Sort"}</span>
				<Select
					value={sort}
					options={sortOptions}
					onChange={onSort}
					label="Sort runs"
				/>
			</div>
		</section>
	)
}

export {
	RunsToolbar,
}
