function formatDate(date: Date) { return new Intl.DateTimeFormat('en', {
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
}).format(date) }

function formatDuration(seconds?: number) {
	if (seconds === undefined) return '—'
	const minutes = Math.floor(seconds / 60); const rest = seconds % 60
	return minutes ? `${minutes}m ${rest}s` : `${rest}s`
}

export {
	formatDate,
	formatDuration,
}
