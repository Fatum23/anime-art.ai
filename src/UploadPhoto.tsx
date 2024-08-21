import { useCallback, useRef } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdInsertPhoto } from 'react-icons/md'

export const UploadPhoto = () => {
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

			let recordedBlobs: BlobPart[] | undefined = []
			mediaRecorder.start()

			setTimeout(() => {
				mediaRecorder.stop()
			}, 5000)

			mediaRecorder.ondataavailable = async event => {
				recordedBlobs.push(event.data)
				const uploadVideo = async () => {
					const blob = new Blob(recordedBlobs, { type: 'video/webm' })
					const formData = new FormData()
					formData.append('video', blob, 'myVideo.webm') // Customize the filename

					try {
						const response = await fetch('/api/uploadVideo', {
							// Replace '/api/uploadVideo' with your backend endpoint
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
		<div className='flex flex-col gap-3'>
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
			<video
				style={{
					height: '0',
					transform: 'rotateY(180deg)',
				}}
				ref={videoRef}
				autoPlay
				loop
				muted
			/>
		</div>
	)
}
