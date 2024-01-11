import React, { useEffect, useRef } from 'react';


const isProd = process.env.NODE_ENV === 'production';
const workerFilename = 'OPFSWorker.js'


const OPFSTest = () => {
    const workerRef = useRef();

    useEffect(() => {
      const workerUrlStr = isProd ?
            `http://${window.location.host}/test-app-opfs/${workerFilename}` :
            `http://${window.location.host}/${workerFilename}`
      console.log('workerUrlStr', workerUrlStr)
      const workerUrl = new URL(workerUrlStr)
        // Initialize the worker
      workerRef.current = new Worker(workerUrl);

        // Handle messages received from the worker
        workerRef.current.onmessage = (event) => {
            if (event.data.error) {
                console.error('Error from worker:', event.data.error);
            } else {
                // Handle successful operations or data
                console.log('Response from worker:', event.data);
            }
        };

        // Clean up the worker when the component unmounts
        return () => {
            workerRef.current.terminate();
        };
    }, []);

    async function opfsTesting() {
        // Send a message to the worker to perform OPFS operations
        workerRef.current.postMessage({ command: 'accessOPFS' });
    }

    return (
        <div>
            <h1>Testing OPFS Features</h1>
            <button onClick={opfsTesting}>Test OPFS Button</button>
        </div>
    );
};

export default OPFSTest;
