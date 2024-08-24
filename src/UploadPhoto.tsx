import { useCallback, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { MdInsertPhoto } from 'react-icons/md'

export const UploadPhoto = () => {
	const [videoVisible, setVideoVisible] = useState<boolean>(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	const startCamera = useCallback(async () => {
		try {
			const socket = new WebSocket('ws://localhost:8000/stream')

			navigator.mediaDevices
				.getUserMedia({ audio: true, video: true })

				.then(stream => {
					// videoRef.current!.srcObject = stream
					const mediaRecorder = new MediaRecorder(stream)

					mediaRecorder.start(2000)

					mediaRecorder.ondataavailable = event => {
						const blob = new Blob([event.data], { type: 'video/webm' })

						// videoRef.current!.src = window.URL.createObjectURL(blob)

						socket.send(event.data)
					}
				})

			const socketServerUrl = 'ws://localhost:8000/stream'

			// const socketServerUrl = 'ws://localhost:8123';

			// Initialize WebSocket connection

			const watchSocket = new WebSocket(socketServerUrl)

			watchSocket.binaryType = 'arraybuffer'

			// socket.onmessage = (event) => {

			// Create a MediaSource object

			var mediaSource = new MediaSource()

			// When the MediaSource is successfully opened

			mediaSource.addEventListener('sourceopen', () => {
				// Create a new SourceBuffer

				var sourceBuffer = mediaSource.addSourceBuffer(
					'video/webm; codecs="vp8, opus"'
				)

				// When a chunk of data is received from the WebSocket

				watchSocket.onmessage = event => {
					const arrayU8 = new Uint8Array(event.data)

					// Check if the MediaSource is still open

					if (mediaSource.readyState === 'open') {
						// Append the received data to the SourceBuffer

						sourceBuffer.appendBuffer(arrayU8)
					} else {
						console.log(
							'Media source is not in open state: ',

							mediaSource.readyState
						)
					}
				}

				// When the SourceBuffer has enough data to start playing

				sourceBuffer.addEventListener('updateend', () => {
					// If the video element is not already playing, start playing it

					if (videoRef.current!.paused) {
						videoRef.current!.play()

						document.body.style.backgroundColor = 'green'
					}
				})

				sourceBuffer.addEventListener('error', event => {
					console.error('SourceBuffer error:', event)
				})
			})

			// When a WebSocket error occurs

			watchSocket.onerror = error => {
				console.error('WebSocket error:', error)
			}

			// When the WebSocket connection is closed

			watchSocket.onclose = () => {
				console.log('WebSocket connection closed.')
			}

			// Assign the MediaSource object to the video element

			videoRef.current!.src = URL.createObjectURL(mediaSource)

			// setTimeout(() => console.log(stream.getVideoTracks()), 10)
			// const mediaRecorder = new MediaRecorder(stream, {
			// 	mimeType: 'video/webm',
			// })
			// videoRef.current!.srcObject = stream
			videoRef.current!.style.height = `${document.body.offsetHeight - 24}px`
			videoRef.current!.scrollIntoView({ behavior: 'smooth' })
			setVideoVisible(true)

			// let recordedBlobs: BlobPart[] | undefined = []
			// mediaRecorder.start()

			// setTimeout(() => {
			// 	mediaRecorder.stop()
			// }, 10000)

			// mediaRecorder.ondataavailable = async event => {
			// 	recordedBlobs.push(event.data)
			// 	const uploadVideo = async () => {
			// 		const blob = new Blob(recordedBlobs, { type: 'video/webm' })
			// 		const formData = new FormData()
			// 		formData.append('video', blob, 'myVideo.webm') // Customize the filename

			// 		try {
			// 			const response = await fetch('/api/uploadVideo', {
			// 				method: 'POST',
			// 				body: formData,
			// 			})

			// 			if (response.ok) {
			// 				console.log('Video uploaded successfully!')
			// 			} else {
			// 				console.error('Upload failed:', response.status)
			// 			}
			// 		} catch (error) {
			// 			console.error('Upload error:', error)
			// 		}
			// 	}
			// 	uploadVideo()
			// }
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
