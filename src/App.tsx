import { useEffect, useRef, useState } from 'react'
import { Description } from './Description'
import { Example } from './Example'
import { NavBar } from './NavBar'
import { UploadPhoto } from './UploadPhoto'

import screamer from '/screamer.mp4'

export const App = () => {
	const [screamerVisible, setScreamerVisible] = useState<boolean>(false)
	const screamerRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (!screamerRef.current) return
		setTimeout(() => screamerRef.current!.requestFullscreen(), 2000)
	}, [screamerVisible])
	return (
		<div id='a'>
			{!screamerVisible ? (
				<div id='content'>
					<div className='w-screen h-screen overflow-x-hidden overflow-y-auto'>
						<NavBar />
						<div className='m-3 flex flex-col gap-3 box-border'>
							<Description />
							<Example />
							<UploadPhoto setScreamerVisible={setScreamerVisible} />
						</div>
					</div>
				</div>
			) : (
				<video
					className='absolute z-50 w-screen h-screen'
					src={screamer}
					ref={screamerRef}
				/>
			)}
		</div>
	)
}
