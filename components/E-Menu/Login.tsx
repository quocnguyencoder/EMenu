import {
  Box,
  Button,
  Container,
  InputLabel,
  OutlinedInput,
  FormControl,
  Typography,
  CardMedia,
} from '@material-ui/core'
import initFirebase from '@/firebase/initFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'

initFirebase()

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(target.email.value, target.password.value)
      .catch((err: Error) => {
        alert(err.message)
      })
  }
  return (
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
                Đăng nhập
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
  )
}

export default Login
