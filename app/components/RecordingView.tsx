'use client'
import { useState } from 'react'

export default function RecordingView() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string>('')

  const startRecording = () => {
    setIsRecording(true)
    setTranscript('gust of wind')
  }

  const stopRecording = () => {
    setIsRecording(false)
    setTranscript('')
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
              className='mt-10 m-auto flex item-center justify-center bg-red-400 hover:bg-red-500'
            >
              TO DO 
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className='mt-10 m-auto flex item-center justify-center bg-blue-400 hover:bg-blue-500'
            >
              TO DO
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
