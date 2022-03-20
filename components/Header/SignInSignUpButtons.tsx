import Button from '@material-ui/core/Button'
import { useStyles } from '@/styles/header'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import * as ROUTES from '@/constants/routes'

const SignInSignUpButtons = () => {
  const classes = useStyles()
  const router = useRouter()

  const goToLogin = () => {
    router.push({
      pathname: ROUTES.LOGIN,
      query: {
        returnURL: router.asPath,
      },
    })
  }
  return (
    <Box className={classes.hideButtons}>
      <Button
        style={{
          textTransform: 'capitalize',
          fontWeight: 'bold',
          borderRadius: '24px',
        }}
      >
        {'Đăng nhập'}
      </Button>
      <Button
        onClick={goToLogin}
        style={{
          background: 'linear-gradient(to right, #f12711, #f5af19)',
          color: '#fff',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          padding: '0 15px 0 15px',
          borderRadius: '24px',
        }}
      >
        {'Đăng ký'}
      </Button>
    </Box>
  )
}

export default SignInSignUpButtons
