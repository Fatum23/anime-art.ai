import before1 from '/before1.webp'
import after1 from '/after1.webp'

export const Example = () => {
	return (
		<div className='flex flex-col sm:flex-row gap-3 justify-center'>
			<div className='relative'>
				<img src={before1} />
				<h1 className='absolute left-1 top-1 bg-sky-500 p-1 px-2 rounded'>
					Before
				</h1>
			</div>
			<div className='relative'>
				<img src={after1} />
				<h1 className='absolute left-1 top-1 bg-sky-500 p-1 px-2 rounded'>
					After
				</h1>
			</div>
		</div>
	)
}
