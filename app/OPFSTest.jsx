import React, { useEffect, useRef } from 'react';


const OPFSTest = () => {
    const workerRef = useRef();

    useEffect(() => {
        const isProd = process.env.NODE_ENV === 'production';
        // Initialize the worker. NB: Cannot use a temp variable for URL
        // based on isProd, where the ternary resolves to using
        // import.meta in one branch but not the other.  It breaks ESM
        // modules in webpack somehow.
        /*
        workerRef.current = isProd ?
            new Worker(new URL(`${window.location.protocol}//${window.location.host}/test-app-opfs/OPFSWorker.js`)) :
            new Worker(new URL('./OPFSWorker.js', import.meta.url));
            */
        workerRef.current = new Worker(new URL('./OPFSWorker.js', import.meta.url));

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
