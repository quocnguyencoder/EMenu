import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CardMedia from '@material-ui/core/CardMedia'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import { useStyles } from '../styles/header'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import useUser from '../firebase/useUser'
import UserMenu from './UserMenu'
import { prefix } from '../constants'

export default function Header() {
  const classes = useStyles()
  const router = useRouter()
  const { user, logout } = useUser()

  const handleClick = () => {
    router.push('/login')
  }

  const gotoHomepage = () => {
    router.push('/')
  }

  const isLoggedIn = user.id !== null

  return (
    <>
      <AppBar color="primary" position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={classes.title}>
              <CardMedia
                component="img"
                image={`${prefix}/logo.png`}
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

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Địa điểm, món ăn, loại hình..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {isLoggedIn ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <Button color="inherit" onClick={() => handleClick()}>
                Đăng nhập
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  )
}
