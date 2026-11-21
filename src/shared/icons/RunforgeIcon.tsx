import type {SVGProps} from 'react'

function RunforgeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect
				width="32"
				height="32"
				rx="10"
				fill="#081A33"
			/>
			<path
				d="M9.2 20.7h13.1a4.3 4.3 0 0 0 .3-8.6 6.3 6.3 0 0 0-11.9 1.1A3.9 3.9 0 0 0 9.2 20.7Z"
				fill="#fff"
			/>
		</svg>
	)
}

export {
	RunforgeIcon,
}
