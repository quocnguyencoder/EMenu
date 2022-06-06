import React from 'react'
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import useUser from '@/firebase/useUser'
import * as updateService from '@/firebase/updateDocument'
import * as uploadService from '@/firebase/filesUpload'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const InfoForm = () => {
  const { user } = useUser()
  const [displayName, setDisplayName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [selectedImage, setSelectedImage] = useState<File[]>([])
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  useEffect(() => {
    setDisplayName(user.name)
    setProfilePic(user.profilePic)
  }, [user])

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
  }

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else if (!e.target.files[0].type.includes('image')) {
      alert('Vui lòng chỉ chọn file ảnh')
    } else {
      setProfilePic(URL.createObjectURL(e.target.files[0]))
      setSelectedImage([...selectedImage, e.target.files[0]])
    }
  }

  const updateUserProfile = async () => {
    if (
      selectedImage.length === 0 &&
      displayName === user.name &&
      profilePic === user.profilePic
    ) {
      return
    }
    try {
      setOpenBackdrop(true)
      const imgURL =
        selectedImage.length !== 0
          ? await uploadService.default.handleFilesUploadOnFirebaseStorage(
              user.id,
              selectedImage,
              'avatar'
            )
          : []

      const userNow = firebase.auth().currentUser
      userNow != null &&
        userNow
          .updateProfile({
            displayName: displayName,
            photoURL: imgURL.length !== 0 ? imgURL[0] : profilePic,
          })
          .then(() => {
            updateService.default.updateUserProfile(
              user.id,
              displayName,
              imgURL.length !== 0 ? imgURL[0] : profilePic
            )
          })
    } finally {
      setSelectedImage([])
      setOpenBackdrop(false)
      setOpenSnackBar(true)
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      bgcolor="#fff"
      maxHeight="60vh"
      alignItems="center"
      style={{ gap: '2%' }}
    >
      <Typography variant="h5" style={{ fontWeight: 700, paddingTop: '2%' }}>
        {'Thông tin tài khoản'}
      </Typography>
      <Avatar src={profilePic} style={{ width: '15vh', height: '15vh' }} />
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={(e) => handleSelectImage(e)}
      />
      <label htmlFor="select-image">
        <Button
          component="span"
          style={{
            backgroundColor: '#e7e7e7',
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          {'Tải ảnh'}
        </Button>
      </label>
      <TextField
        disabled
        label="Email"
        variant="outlined"
        value={user.email}
        style={{ width: '100%', maxWidth: '20rem' }}
      />

      <TextField
        label="Tên hiển thị"
        variant="outlined"
        value={displayName}
        style={{ width: '100%', maxWidth: '20rem' }}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <Button
        onClick={updateUserProfile}
        style={{
          padding: '10px',
          marginTop: '5%',
          textTransform: 'none',
          backgroundColor: '#3f37fe',
          color: 'white',
          fontWeight: 600,
        }}
      >
        {'Lưu thay đổi'}
      </Button>
      <Backdrop open={openBackdrop} style={{ zIndex: 100 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="success">
          Cập nhật thông tin thành công
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default InfoForm
