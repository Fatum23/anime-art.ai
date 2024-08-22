import { useEffect, useState } from 'react'
import { Modal } from './Modal'

export const NavBar = () => {
	const [accountLogin, setAccountLogin] = useState<string | null>(
		localStorage.getItem('login') !== null
			? localStorage.getItem('login')
			: null
	)
	const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false)
	const [signupModalOpen, setSignupModalOpen] = useState<boolean>(false)
	const [creditsModalOpen, setCreditsModalOpen] = useState<boolean>(false)

	useEffect(() => {
		if (!loginModalOpen && !signupModalOpen) {
			setLogin('')
			setPassword('')
			setSecondPassword('')
		}
	}, [loginModalOpen, signupModalOpen])

	useEffect(() => {
		if (!accountLogin) {
			localStorage.removeItem('login')
			return
		}
		localStorage.setItem('login', accountLogin)
	}, [accountLogin])

	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [secondPassword, setSecondPassword] = useState<string>('')

	return (
		<div className='bg-violet-700 w-full h-16 rounded-b-xl flex flex-row items-center justify-between px-3 gap-3'>
			<div className='flex flex-row gap-3 items-center'>
				<h1>0 credits</h1>
				<div
					className='cursor-pointer underline underline-offset-4'
					onClick={() => setCreditsModalOpen(true)}
				>
					Buy
				</div>
			</div>
			<div className='flex flex-row gap-3 items-center'>
				<div className='flex flex-row gap-3 items-center'>
					{!accountLogin && (
						<>
							<button onClick={() => setLoginModalOpen(true)}>Login</button>
							<button onClick={() => setSignupModalOpen(true)}>Sign Up</button>
						</>
					)}
				</div>
				{accountLogin && <h1>{accountLogin}</h1>}
				{accountLogin && (
					<button onClick={() => setAccountLogin(null)}>Logout</button>
				)}
			</div>
			<Modal
				title='Login'
				open={loginModalOpen}
				setOpen={setLoginModalOpen}
				closable
				confirmEnabled={login !== '' && password !== ''}
				cancelButton
				onCancel={() => {
					setLoginModalOpen(false)
				}}
				onConfirm={() => {
					setAccountLogin(login)
					setLoginModalOpen(false)
				}}
				onClose={() => {
					setLoginModalOpen(false)
				}}
			>
				<div className='flex flex-col gap-2'>
					<input
						maxLength={15}
						placeholder='Login'
						value={login}
						onChange={e => setLogin(e.target.value)}
					/>
					<input
						maxLength={15}
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
			</Modal>
			<Modal
				title='Sign Up'
				open={signupModalOpen}
				setOpen={setSignupModalOpen}
				closable
				confirmEnabled={
					login !== '' && password !== '' && password === secondPassword
				}
				cancelButton
				onCancel={() => {
					setSignupModalOpen(false)
				}}
				onConfirm={() => {
					setAccountLogin(login)
					setSignupModalOpen(false)
				}}
				onClose={() => {
					setSignupModalOpen(false)
				}}
			>
				<div className='flex flex-col gap-2'>
					<input
						maxLength={15}
						placeholder='Login'
						value={login}
						onChange={e => setLogin(e.target.value)}
					/>
					<input
						maxLength={15}
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<input
						maxLength={15}
						type='password'
						placeholder='Repeat password'
						value={secondPassword}
						onChange={e => setSecondPassword(e.target.value)}
					/>
				</div>
			</Modal>
			<Modal
				title='Buy credits'
				open={creditsModalOpen}
				setOpen={setCreditsModalOpen}
				closable
				confirmEnabled
				cancelButton={false}
				onCancel={() => {
					setCreditsModalOpen(false)
				}}
				onConfirm={() => {
					setCreditsModalOpen(false)
				}}
				onClose={() => {
					setCreditsModalOpen(false)
				}}
			>
				{accountLogin ? (
					<h1 className='text-red-500'>
						The service is temporarily unavailable. Technical work is underway
					</h1>
				) : (
					'You must be logged in to buy credits'
				)}
			</Modal>
		</div>
	)
}
