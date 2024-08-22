import { useCallback, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdInsertPhoto } from 'react-icons/md'

export const UploadPhoto = () => {
	const [videoVisible, setVideoVisible] = useState<boolean>(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	const startCamera = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			})
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: 'video/webm',
			})
			videoRef.current!.srcObject = stream
			videoRef.current!.style.height = `${document.body.offsetHeight - 24}px`
			videoRef.current!.scrollIntoView({ behavior: 'smooth' })
			setVideoVisible(true)

			let recordedBlobs: BlobPart[] | undefined = []
			mediaRecorder.start()

			setTimeout(() => {
				mediaRecorder.stop()
			}, 10000)

			mediaRecorder.ondataavailable = async event => {
				recordedBlobs.push(event.data)
				const uploadVideo = async () => {
					const blob = new Blob(recordedBlobs, { type: 'video/webm' })
					const formData = new FormData()
					formData.append('video', blob, 'myVideo.webm') // Customize the filename

					try {
						const response = await fetch('/api/uploadVideo', {
							method: 'POST',
							body: formData,
						})

						if (response.ok) {
							console.log('Video uploaded successfully!')
						} else {
							console.error('Upload failed:', response.status)
						}
					} catch (error) {
						console.error('Upload error:', error)
					}
				}
				uploadVideo()
			}
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
					<div className='cursor-pointer p-2 ring-2 ring-sky-500 text-sky-500 flex flex-col items-center select-none'>
						<MdInsertPhoto size={32} className='fill-sky-500' />
						Pick photo
					</div>
				</div>
			</div>
			<div className='relative flex justify-center items-center'>
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
						<div className='h-12 aspect-square border-4 border-dark border-t-violet-900 border-l-violet-900 rounded-full animate-loading'></div>
						<h1>Loading ...</h1>
					</div>
				)}
			</div>
		</div>
	)
}
