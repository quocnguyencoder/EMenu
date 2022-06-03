import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Box } from '@material-ui/core'
import useUser from '@/firebase/useUser'
import IconWithDrawer from './IconWithDrawer'
import SignInSignUpButtons from './SignInSignUpButtons'
import CartWithDrawer from './CartWithDrawer'
import SearchBar from './SearchBar'

import Logo from './Logo'

export default function Header() {
  const { user } = useUser()

  const isLoggedIn = user.id !== ''

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={1}>
        <Toolbar
          variant="dense"
          style={{
            display: 'flex',
            minHeight: '3.6rem',
            padding: '0.3rem 0',
            justifyContent: 'space-around',
          }}
        >
          <IconWithDrawer />
          <Logo />
          <Box display="flex" alignItems="center" style={{ gap: '5%' }}>
            <SearchBar />
            {isLoggedIn ? <CartWithDrawer /> : <SignInSignUpButtons />}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar
        variant="dense"
        style={{ minHeight: '3.6rem', padding: '0.3rem' }}
      />
    </>
  )
}
