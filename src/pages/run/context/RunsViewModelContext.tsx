import {
	createContext,
	type ReactNode,
	useContext,
} from 'react'
import {
	type RunsViewModel,
	useRunsViewModel,
} from '../viewmodel/useRunsViewModel'

interface RunsViewModelProviderProps {
	children: ReactNode
}

const RunsViewModelContext = createContext<RunsViewModel | null>(null)

function RunsViewModelProvider({children}: RunsViewModelProviderProps) {
	const value = useRunsViewModel()

	return (
		<RunsViewModelContext.Provider value={value}>
			{children}
		</RunsViewModelContext.Provider>
	)
}

function useRunsViewModelContext() {
	const value = useContext(RunsViewModelContext)

	if (!value) throw new Error('Runs components must be rendered within RunsViewModelProvider')

	return value
}

export {
	RunsViewModelProvider,
	useRunsViewModelContext,
}
