import styles from './Input.module.css'
import type {InputHTMLAttributes} from 'react'
function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input
	className={styles['input']}
	{...props}
/> }

export {
	Input,
}
