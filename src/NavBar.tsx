export const NavBar = () => {
	return (
		<div className='bg-violet-700 w-full h-16 rounded-b-xl flex flex-row items-center justify-between px-3 gap-3'>
			<h1>0 credits</h1>
			<div className='flex flex-row gap-3'>
				<button>Login</button>
				<button>Sign Up</button>
			</div>
			{/* //TODO isLogined && Buy credits button */}
		</div>
	)
}
