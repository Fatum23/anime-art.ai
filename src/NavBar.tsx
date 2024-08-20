export const NavBar = () => {
	return (
		<>
			<div className='bg-violet-900 w-full h-16 fixed rounded-b-xl flex flex-row items-center justify-between px-4 gap-4'>
				<h1>0 credits</h1>
				<div className='flex flex-row gap-4'>
					<button>Login</button>
					<button>Sign Up</button>
				</div>
				{/* //TODO isLogined && Buy credits button */}
			</div>
			<div className='h-16'></div>
		</>
	)
}
