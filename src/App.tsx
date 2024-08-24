import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Description } from './Description'
import { Example } from './Example'
import { NavBar } from './NavBar'
import { UploadPhoto } from './UploadPhoto'
import { Stream } from './Stream'

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<div id='content'>
								<div className='w-screen h-screen overflow-x-hidden overflow-y-auto'>
									<NavBar />
									<div className='m-3 flex flex-col gap-3 box-border'>
										<Description />
										<Example />
										<UploadPhoto />
									</div>
								</div>
							</div>
						}
					/>
					<Route path='/stream' element={<Stream />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
