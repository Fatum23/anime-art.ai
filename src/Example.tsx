import before from '/before.webp'
import after from '/after.webp'

export const Example = () => {
	return (
		<div className='flex flex-col sm:flex-row gap-3 justify-center'>
			<div className='relative'>
				<img src={before} />
				<h1 className='absolute left-1 top-1 bg-sky-500 p-1 px-2 rounded bg-gradient-to-r from-purple-500 to-sky-400'>
					Before
				</h1>
			</div>
			<div className='relative'>
				<img src={after} />
				<h1 className='absolute left-1 top-1 bg-sky-500 p-1 px-2 rounded bg-gradient-to-r from-purple-500 to-sky-400'>
					After
				</h1>
			</div>
		</div>
	)
}
