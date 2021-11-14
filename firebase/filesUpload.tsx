import firebase from 'firebase/app'
import 'firebase/storage'

const handleFileUploadOnFirebaseStorage = async (
  bucketName: string,
  file: File
) => {
  // 1. If no file, return
  if (file == null) return ''

  // 2. Put the file into bucketName
  const uploadTask = await firebase
    .storage()
    .ref(`user_uploads/${bucketName}/${file.name}`)
    .put(file)

  // 3. Get download URL and return it as
  return uploadTask.ref.getDownloadURL().then((fileURL) => fileURL as string)
}

const handleFilesUploadOnFirebaseStorage = async (
  bucketName: string,
  files: File[]
) => {
  // 1. If no file, return
  if (files.length === 0) return []

  // 2. Create an array to store all download URLs
  const fileUrls: string[] = []

  // 3. Loop over all the files
  for (let i = 0; i < files.length; i++) {
    // 3A. Get a file to upload
    const file = files[i]

    // 3B. handleFileUploadOnFirebaseStorage function is in above section
    const downloadFileResponse = await handleFileUploadOnFirebaseStorage(
      bucketName,
      file
    )

    // 3C. Push the download url to URLs array
    fileUrls.push(downloadFileResponse)
  }

  return fileUrls
}

export default { handleFilesUploadOnFirebaseStorage }
