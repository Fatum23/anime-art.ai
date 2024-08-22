import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react'
import ReactDOM from 'react-dom'

export const Modal = (props: {
	title?: string
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	children: ReactNode
	closable: boolean
	confirmEnabled: boolean
	cancelButton: boolean
	onCancel: () => void
	onConfirm: () => void
	onClose?: () => void
}) => {
	const [modalTimeout, setModalTimeout] = useState<number | undefined>()

	useEffect(() => {
		if (props.open) {
			clearTimeout(modalTimeout)
			document.documentElement.classList.add('modal-open')
		} else {
			setModalTimeout(
				setTimeout(() => {
					document.documentElement.classList.remove('modal-open')
				}, 300)
			)
		}
	}, [props.open])

	const documentOnKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (props.open) {
				if (e.key === 'Escape') {
					;(document.activeElement! as HTMLElement).blur()
					props.closable && props.setOpen(false)
				}
			}
		},
		[props.open]
	)

	useEffect(() => {
		document.getElementById('content')!.inert = props.open ? true : false
		document.getElementById('modal')!.inert = props.open ? false : true
	}, [props.open])

	useEffect(() => {
		document.addEventListener('keydown', documentOnKeyDown)

		return () => {
			document.removeEventListener('keydown', documentOnKeyDown)
		}
	}, [documentOnKeyDown])

	useEffect(() => {
		if (!props.open) {
			document.getElementById('content')!.inert = false
			//disable inert when hot reload
		}
	}, [])
	//TODO maybe remove ueh above

	return ReactDOM.createPortal(
		<div
			style={{
				opacity: props.open ? 1 : 0,
				backgroundColor: 'rgba(0, 0, 0, 0.3)',
			}}
			{...{ inert: props.open ? undefined : '' }}
			onMouseDown={() => props.closable && props.setOpen(false)}
			className='absolute w-full h-full z-50 flex items-center justify-center transition-opacity duration-300'
		>
			<div
				onMouseDown={e => e.stopPropagation()}
				{...{ inert: props.open ? undefined : '' }}
			>
				<div className='min-w-48 p-2 bg-violet-900 rounded-md flex flex-col gap-2 justify-between drop-shadow-2xl'>
					{props.title && <h1 className='text-center'>{props.title}</h1>}
					<div>{props.children}</div>
					<div className='flex flex-row gap-2'>
						{props.cancelButton && (
							<button className='w-1/2 p-1 px-2' onClick={props.onCancel}>
								Cancel
							</button>
						)}
						<button
							disabled={!props.confirmEnabled}
							className={`${
								props.cancelButton ? 'w-1/2' : 'w-full'
							} p-1 px-2 bg-accent hover:bg-accent-hover`}
							onClick={props.onConfirm}
						>
							Ok
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal')!
	)
}
