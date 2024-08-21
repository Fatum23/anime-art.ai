import { Description } from './Description'
import { Example } from './Example'
import { NavBar } from './NavBar'
import { UploadPhoto } from './UploadPhoto'

export const App = () => {
	// useEffect(() => {
	// 	fetch('/api/')
	// 		.then(res => res.json())
	// 		.then(data => setBackendReply(data))
	// 	fetch('/api/time')
	// 		.then(res => res.json())
	// 		.then(time => setTime(time))
	// }, [])

	return (
		<div className='w-screen h-screen overflow-x-hidden overflow-y-auto'>
			<NavBar />
			<div className='m-3 flex flex-col gap-3 box-border'>
				<Description />
				<Example />
				<UploadPhoto />
			</div>
		</div>
	)
}
