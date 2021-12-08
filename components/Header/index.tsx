import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CardMedia from '@material-ui/core/CardMedia'
import Toolbar from '@material-ui/core/Toolbar'
import { useStyles } from '../../styles/header'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import useUser from '@/firebase/useUser'
import UserMenu from './UserMenu'
import * as ROUTES from '@/constants/routes'
import SearchBar from './SearchBar'

export default function Header() {
  const classes = useStyles()
  const router = useRouter()
  const { user, logout } = useUser()

  const handleClick = () => {
    router.push({
      pathname: ROUTES.LOGIN,
      query: {
        returnURL: router.asPath,
      },
    })
  }

  const gotoHomepage = () => {
    router.push(ROUTES.HOME)
  }

  const isLoggedIn = user.id !== ''

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#fff' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={classes.title}>
              <CardMedia
                component="img"
                image={`/logo.png`}
                title="logo"
                style={{
                  height: '7vh',
                  width: '9vw',
                  maxWidth: '110px',
                  maxHeight: '50px',
                  cursor: 'pointer',
                }}
                onClick={() => gotoHomepage()}
              />
            </Box>

            <SearchBar />
            <Box flex={1}>
              {isLoggedIn ? (
                <UserMenu user={user} logout={logout} />
              ) : (
                <Button
                  style={{ color: 'grey', float: 'right' }}
                  onClick={() => handleClick()}
                >
                  Đăng nhập
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}
