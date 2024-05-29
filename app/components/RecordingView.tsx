'use client'
import { useRef, useState } from 'react'

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export default function RecordingView() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string>('')

  const recognitionRef = useRef<any>(null)

  const startRecording = () => {
    setIsRecording(true)

    recognitionRef.current = new window.webkitSpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.onresult = (e: any) => {
      const { transcript } = e.results[e.results.length - 1][0]
      setTranscript(transcript)
    }
    recognitionRef.current.start()
  }

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  },[])

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      startRecording
    } else {
      stopRecording()
    }
  }
  return (
    <div className='flex item-center justify-center h-screen w-full'>
      <div className='w-full'>
        {(isRecording || transcript) && (
          <div className='w-1/4 m-auto rounded-md border p-4 bg-white'>
            <div className='flex flex-1 w-full justify-between'>
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {recordingComplete ? 'Recorded' : 'Recording'}
                </p>
                <p className='text-sm'>
                  {recordingComplete ? 'Thanks!' : 'Starting speaking..'}
                </p>
              </div>
              {isRecording && (
                <div className='round-full w-4 h-4 bg-red-400 animate-pulse' />
              )}
            </div>
            {transcript && (
              <div className='border'>
                <p className='text-sm mb-0'>{transcript}</p>
              </div>
            )}
          </div>
        )}
        {/* Buttons */}
        <div className='flex items-center w-full'>
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className='rounded-full w-20 h-20 mt-10 m-auto  flex item-center justify-center bg-red-400 hover:bg-red-500'
            >
              <svg
                className='w-12 h-12 mt-3.5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect fill='bg-red-400 hover:bg-red-500' />
                <path
                  d='M8.5 18H9.5C10.0523 18 10.5 17.5523 10.5 17V7C10.5 6.44772 10.0523 6 9.5 6H8.5C7.94772 6 7.5 6.44772 7.5 7V17C7.5 17.5523 7.94772 18 8.5 18Z'
                  stroke='#000000'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M14.5 18H15.5C16.0523 18 16.5 17.5523 16.5 17V7C16.5 6.44772 16.0523 6 15.5 6H14.5C13.9477 6 13.5 6.44772 13.5 7V17C13.5 17.5523 13.9477 18 14.5 18Z'
                  stroke='#000000'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className='rounded-full w-20 h-20 mt-10 m-auto flex item-center justify-center bg-blue-400 hover:bg-blue-500'
            >
              <svg
                className='w-10 h-10 mt-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12 1C9.79086 1 8 2.79086 8 5V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V5C16 2.79086 14.2091 1 12 1ZM10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5V12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12V5Z'
                  fill='#000000'
                />
                <path
                  d='M5 9C5.55228 9 6 9.44771 6 10V12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12V10C18 9.44771 18.4477 9 19 9C19.5523 9 20 9.44771 20 10V12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.3938 18.9199 14.7518 19.717 12.9981 19.9375C12.9993 19.9582 13 19.979 13 20V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20C11 19.979 11.0006 19.9582 11.0019 19.9375C9.2482 19.717 7.60623 18.9199 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12V10C4 9.44771 4.44772 9 5 9Z'
                  fill='#000000'
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error('Function not implemented.')
}
