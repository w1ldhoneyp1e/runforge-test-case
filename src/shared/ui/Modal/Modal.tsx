import {
	type MouseEvent,
	type ReactNode,
	useEffect,
	useId,
	useRef,
} from 'react'
import styles from './Modal.module.css'

interface ModalProps {
	open: boolean
	onClose: () => void
	title: string
	children: ReactNode
}

function Modal({
	open, onClose, title, children,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const titleId = useId()

	useEffect(() => {
		if (open && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal()
	}, [open])

	function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
		if (event.target === event.currentTarget) onClose()
	}

	if (!open) return null

	return (
		<dialog
			ref={dialogRef}
			className={styles.modal}
			aria-labelledby={titleId}
			onClick={handleBackdropClick}
			onCancel={(event) => {
				event.preventDefault()
				onClose()
			}}
		>
			<div className={styles.heading}>
				<h2 id={titleId}>{title}</h2>
				<button
					type="button"
					className={styles.close}
					aria-label="Close details"
					onClick={onClose}
				>{"×"}</button>
			</div>
			{children}
		</dialog>
	)
}

export {
	Modal,
}
