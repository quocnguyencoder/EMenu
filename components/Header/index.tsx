import * as ROUTES from '@/constants/routes'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useStyles } from '../../styles/header'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import useUser from '@/firebase/useUser'
import Image from 'next/image'
import IconWithDrawer from './IconWithDrawer'
import SignInSignUpButtons from './SignInSignUpButtons'

export default function Header() {
  const classes = useStyles()
  const router = useRouter()
  const { user } = useUser()

  const gotoHomepage = () => {
    router.push(ROUTES.HOME)
  }

  const isLoggedIn = user.id !== ''

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar
          variant="dense"
          style={{
            display: 'flex',
          }}
        >
          <IconWithDrawer />
          <Box
            display="block"
            onClick={gotoHomepage}
            style={{ cursor: 'pointer' }}
          >
            <Image src="/logo.png" height="45px" width="115px" />
          </Box>
          <Box className={classes.sideBox} justifyContent="flex-end">
            {!isLoggedIn && <SignInSignUpButtons />}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  )
}
