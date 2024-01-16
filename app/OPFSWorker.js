// opfsWorker.js

self.addEventListener('message', async (event) => {
  const log = [], err = []
  try {
    // Depending on the message, you can handle different OPFS operations
    if (event.data.command === 'accessOPFS') {
      try {
        try {
          const opfsRoot = await navigator.storage.getDirectory()

          // Try to access an existing file
          let existingFileHandle
          try {
            existingFileHandle = await opfsRoot.getFileHandle('testFile')
          } catch (error) {
            log.push('File "testFile" not found, creating new file.')
            existingFileHandle = await opfsRoot.getFileHandle('testFile', { create: true })
          }

          // Try to access an existing directory
          let existingDirectoryHandle
          try {
            existingDirectoryHandle = await opfsRoot.getDirectoryHandle('testFolder')
          } catch (error) {
            log.push('Directory "testFolder" not found, creating new directory.')
            existingDirectoryHandle = await opfsRoot.getDirectoryHandle('testFolder', { create: true })
          }

          //write to file
          // create a FileSystemWritableFileStream to write to
          try {
            log.push('Writing "Hello, World!" to testFile...')
            // Create FileSystemSyncAccessHandle on the file.
            const accessHandle = await existingFileHandle.createSyncAccessHandle()

            const encoder = new TextEncoder()
            const writeBuffer = encoder.encode('Hello World!')
            // Write buffer at the end of the file
            const writeSize = accessHandle.write(writeBuffer, { at: 0 })
            // Close the access handle when done
            await accessHandle.close()

          } catch (error) {
            log.push(`Error writing to testFile: ${error}.`)
          }

          //try reading from file
          try {
            const file = await existingFileHandle.getFile()
            const testBlobStr = await file.text()
            log.push(`testFile contents: ${testBlobStr}`)
          } catch (error) {
            log.push(`Error reading from testFile: ${error}.`)
          }

          //delete file and folder
          log.push('deleting testFile')
          opfsRoot.removeEntry('testFile')

          try {
            existingFileHandle = await opfsRoot.getFileHandle('testFile')
          } catch (error) {
            log.push('testFile deleted.')
          }

          log.push('deleting testFolder...')
          opfsRoot.removeEntry('testFolder')

          try {
            existingDirectoryHandle = await opfsRoot.getDirectoryHandle('testFolder')
          } catch (error) {
            log.push('testFolder deleted.')
          }

        } catch (error) {
          err.push('Error accessing OPFS:')
          err.push(error)
        }




        /*const fileHandle = await window.showSaveFilePicker()
          const fileStream = await fileHandle.createWritable()
          await fileStream.write('Hello, World!')
          await fileStream.close()
          log.push('File created successfully.')*/
      } catch (error) {
        err.push('Error creating file:')
        err.push(error)
      }
    }
    self.postMessage(log)
  } catch (error) {
    self.postMessage({ error: error.message })
  }
})
