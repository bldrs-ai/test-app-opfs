import React, { useEffect, useRef, useState } from 'react'


const OPFSTest = () => {
  const workerRef = useRef()
  const [log, setLog] = useState([])

  useEffect(() => {
    workerRef.current = new Worker(new URL('./OPFSWorker.js', import.meta.url))

    // Handle messages received from the worker
    workerRef.current.onmessage = (event) => {
      if (event.data.error) {
        console.error('Error from worker:', event.data.error)
      } else {
        // Handle successful operations or data
        console.log('Response from worker:', event.data)
        setLog(event.data)
      }
    }

    // Clean up the worker when the component unmounts
    return () => {
      workerRef.current.terminate()
    }
  }, [])

  async function opfsTesting() {
    // Send a message to the worker to perform OPFS operations
    workerRef.current.postMessage({ command: 'accessOPFS' })
  }

  return (
    <div>
      <h1>Testing OPFS Features</h1>
      <button onClick={opfsTesting}>Test OPFS Button</button>
      <ol>
        Log: {log.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  )
}

export default OPFSTest
