import { useRef, useState } from 'react'
import { Description } from './Description'
import { Example } from './Example'
import { NavBar } from './NavBar'
import { UploadPhoto } from './UploadPhoto'

import screamer from '/screamer.mp4'

export const App = () => {
	const [screamerVisible, setScreamerVisible] = useState<boolean>(false)
	const screamerRef = useRef<HTMLVideoElement>(null)

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
					className='absolute z-50 w-screen h-screen object-fill'
					autoPlay
					src={screamer}
					ref={screamerRef}
				/>
			)}
		</div>
	)
}
