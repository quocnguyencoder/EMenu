import {
  Box,
  Button,
  Container,
  InputLabel,
  OutlinedInput,
  FormControl,
  Typography,
  CardMedia,
  Snackbar,
} from '@material-ui/core'
import initFirebase from '@/firebase/initFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import { useEffect, useState } from 'react'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'
import isEqual from 'lodash/isEqual'

initFirebase()

interface State extends SnackbarOrigin {
  open: boolean
}

interface Error {
  code: string
  message: string
  a: any
}

const Login = () => {
  const [userID, setUserID] = useState()

  useEffect(() => {
    const objUserID = JSON.parse(sessionStorage.getItem('userID') || '{}')
    if (!isEqual(objUserID, {})) {
      router.push(ROUTES.HOME)
    } else {
      setUserID(objUserID)
    }
  }, [])
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state
  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
  })

  const handleOpenAlert = (text: string, severity: Color) => {
    setState({ ...state, open: true })
    setMessage({
      text: text,
      severity: severity,
    })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(target.email.value, target.password.value)
      .then((userCredential) => {
        firebase
          .firestore()
          .collection('admin')
          .doc(userCredential.user?.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              router.push(ROUTES.EMenuAdmin)
            } else {
              firebase.auth().signOut()
              handleOpenAlert(`Sai mật khẩu`, `error`)
            }
          })
      })
      .catch((err: Error) => {
        if (err.code === 'auth/wrong-password') {
          handleOpenAlert(`Sai mật khẩu`, `error`)
        } else {
          handleOpenAlert(`Không tồn tại người dùng này`, `error`)
        }
      })
  }

  return userID !== undefined ? (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ my: 3 }}>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  alignItems: 'center',
                }}
              >
                <Typography color="textPrimary" variant="h4">
                  ĐĂNG NHẬP
                </Typography>
                <CardMedia
                  component="img"
                  image={`/logo.png`}
                  title="logo"
                  style={{
                    minHeight: '7vh',
                    minWidth: '9vw',
                    maxWidth: '110px',
                    maxHeight: '50px',
                  }}
                />
              </Box>
              <Box>
                <FormControl fullWidth margin="dense" variant="outlined">
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput required name="email" label="email" />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth margin="dense" variant="outlined">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    type="password"
                    required
                    name="password"
                    label="password"
                  />
                </FormControl>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                sx={{ py: 2 }}
                style={{
                  alignItems: 'center',
                }}
              >
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Đăng nhập
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  style={{ paddingTop: '2%' }}
                >
                  Không có tài khoản?
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Vui lòng liên hệ quản trị viên để được cấp tài khoản
                </Typography>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        open={open}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert variant="filled" severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </>
  ) : (
    <></>
  )
}

export default Login
