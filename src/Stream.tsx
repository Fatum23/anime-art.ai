import { useEffect, useRef } from 'react'

export const Stream = () => {
	const videoRef = useRef<HTMLVideoElement>(null)

	// useEffect(() => {
	// 	if (!videoRef) return
	// 	const socketServerUrl = 'ws://localhost:8000/stream'
	// 	const watchSocket = new WebSocket(socketServerUrl)
	// 	watchSocket.binaryType = 'arraybuffer'

	// 	var mediaSource = new MediaSource()

	// 	mediaSource.addEventListener('sourceopen', () => {
	// 		console.log('sourceopen')
	// 		var sourceBuffer = mediaSource.addSourceBuffer(
	// 			'video/webm; codecs="vp8, opus"'
	// 		)

	// 		watchSocket.onmessage = event => {
	// 			console.log(event)
	// 			const arrayU8 = new Uint8Array(event.data)
	// 			if (mediaSource.readyState === 'open') {
	// 				sourceBuffer.appendBuffer(arrayU8)
	// 			} else {
	// 				console.log(
	// 					'Media source is not in open state:',
	// 					mediaSource.readyState
	// 				)
	// 			}
	// 		}

	// 		sourceBuffer.addEventListener('error', event => {
	// 			console.error('SourceBuffer error:', event)
	// 		})
	// 	})

	// 	watchSocket.onerror = error => {
	// 		console.error('WebSocket error:', error)
	// 	}

	// 	watchSocket.onmessage = e => console.log(e.data)

	// 	watchSocket.onclose = () => {
	// 		console.log('WebSocket connection closed.')
	// 	}

	// 	// videoRef.current!.src = URL.createObjectURL(mediaSource)
	// 	// watchSocket.onmessage = e =>
	// 	// 	(videoRef.current!.src = window.URL.createObjectURL(e.data))
	// }, [])

	return (
		<div className='w-screen h-screen'>
			<button
				onClick={() => {
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
				}}
			>
				Start
			</button>
			<video className='w-12 h-12' ref={videoRef} />
		</div>
	)
}
