import { useEffect, useRef } from 'react'

export const Stream = () => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (!videoRef) return
		const socketServerUrl = 'ws://localhost:8000/stream'
		const watchSocket = new WebSocket(socketServerUrl)
		watchSocket.binaryType = 'arraybuffer'

		var mediaSource = new MediaSource()

		mediaSource.addEventListener('sourceopen', () => {
			console.log('sourceopen')
			var sourceBuffer = mediaSource.addSourceBuffer(
				'video/webm; codecs="vp8, opus"'
			)

			watchSocket.onmessage = event => {
				console.log(event)
				const arrayU8 = new Uint8Array(event.data)
				if (mediaSource.readyState === 'open') {
					sourceBuffer.appendBuffer(arrayU8)
				} else {
					console.log(
						'Media source is not in open state:',
						mediaSource.readyState
					)
				}
			}

			sourceBuffer.addEventListener('error', event => {
				console.error('SourceBuffer error:', event)
			})
		})

		watchSocket.onerror = error => {
			console.error('WebSocket error:', error)
		}

		watchSocket.onmessage = e => console.log(e.data)

		watchSocket.onclose = () => {
			console.log('WebSocket connection closed.')
		}

		// videoRef.current!.src = URL.createObjectURL(mediaSource)
		// watchSocket.onmessage = e =>
		// 	(videoRef.current!.src = window.URL.createObjectURL(e.data))
	}, [])

	return (
		<div className='w-screen h-screen'>
			<video className='w-12 h-12' ref={videoRef} />
		</div>
	)
}
