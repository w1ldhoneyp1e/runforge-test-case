import type {ButtonHTMLAttributes} from 'react'
import styles from './Button.module.css'

function Button({
	children, className = '', ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`${styles.button} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export {
	Button,
}
