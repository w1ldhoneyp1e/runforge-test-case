import {
	type KeyboardEvent,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import styles from './Select.module.css'

interface SelectOption<T extends string> {
	value: T
	label: string
}

interface SelectProps<T extends string> {
	value: T
	options: ReadonlyArray<SelectOption<T>>
	onChange: (value: T) => void
	label: string
}

function Select<T extends string>({
	value, options, onChange, label,
}: SelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)
	const listId = useId()
	const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))

	useEffect(() => {
		if (!isOpen) return

		function onPointerDown(event: PointerEvent) {
			if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
		}

		document.addEventListener('pointerdown', onPointerDown)
		return () => document.removeEventListener('pointerdown', onPointerDown)
	}, [isOpen])

	function open() {
		setActiveIndex(selectedIndex)
		setIsOpen(true)
	}

	function choose(index: number) {
		const option = options[index]
		if (option) onChange(option.value)
		setIsOpen(false)
	}

	function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		if (event.key === 'Escape' || event.key === 'Tab') {
			setIsOpen(false)
			return
		}
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault()
			if (!isOpen) {
				open()
			} else {
				const direction = event.key === 'ArrowDown' ? 1 : -1
				setActiveIndex((index) => Math.max(0, Math.min(options.length - 1, index + direction)))
			}
			return
		}
		if (isOpen && (event.key === 'Home' || event.key === 'End')) {
			event.preventDefault()
			setActiveIndex(event.key === 'Home' ? 0 : options.length - 1)
			return
		}
		if (isOpen && (event.key === 'Enter' || event.key === ' ')) {
			event.preventDefault()
			choose(activeIndex)
		}
	}

	return (
		<div
			className={styles.container}
			ref={containerRef}
		>
			<button
				type="button"
				className={styles.trigger}
				role="combobox"
				aria-label={label}
				aria-expanded={isOpen}
				aria-controls={isOpen ? listId : undefined}
				aria-activedescendant={isOpen ? `${listId}-${activeIndex}` : undefined}
				aria-haspopup="listbox"
				onClick={() => isOpen ? setIsOpen(false) : open()}
				onKeyDown={onKeyDown}
			>
				<span>{options[selectedIndex]?.label}</span>
				<svg
					className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
					viewBox="0 0 16 16"
					aria-hidden="true"
				>
					<path
						d="m4 6 4 4 4-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			{isOpen && (
				<div
					className={styles.list}
					id={listId}
					role="listbox"
					aria-label={label}
				>
					{options.map((option, index) => (
						<div
							key={option.value}
							id={`${listId}-${index}`}
							role="option"
							aria-selected={option.value === value}
							className={`${styles.option} ${index === activeIndex ? styles.active : ''}`}
							onPointerMove={() => setActiveIndex(index)}
							onClick={() => choose(index)}
						>
							<span>{option.label}</span>
							{option.value === value && <span aria-hidden="true">{"✓"}</span>}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export {
	Select,
}
