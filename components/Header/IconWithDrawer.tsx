import * as ROUTES from '@/constants/routes'
import { useState } from 'react'
import { useStyles } from '@/styles/header'
import { useRouter } from 'next/router'
import useUser from '@/firebase/useUser'
import { Box, Drawer, IconButton, List } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import DrawerActionButton from './DrawerActionButton'
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined'
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined'
import CardGiftcardOutlinedIcon from '@material-ui/icons/CardGiftcardOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'

const IconWithDrawer = () => {
  const classes = useStyles()
  const [drawerState, toggleDrawer] = useState(false)
  const { user, logout } = useUser()

  const isLoggedIn = user.id !== ''

  const handleCloseDrawer = () => {
    toggleDrawer(false)
  }

  const router = useRouter()

  const goToLogin = () => {
    handleCloseDrawer()
    router.push({
      pathname: ROUTES.LOGIN,
      query: {
        returnURL: router.asPath,
      },
    })
  }

  const goToPage = (pathname: string) => {
    handleCloseDrawer()
    router.push(pathname)
  }

  const optionList = [
    {
      text: 'Trang chủ',
      caption: '',
      icon: <HomeOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: true,
    },
    {
      text: 'Khuyến mãi',
      caption: '',
      icon: <LocalOfferOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: isLoggedIn,
    },
    {
      text: 'Đơn hàng',
      caption: '',
      icon: <ReceiptOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: isLoggedIn,
    },
    {
      text: 'Tài khoản',
      caption: user.name,
      icon: <AccountCircleOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.USER_PROFILE),
      show: isLoggedIn,
    },
    {
      text: 'Địa điểm đã lưu',
      caption: '',
      icon: <FavoriteBorderOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: isLoggedIn,
    },
    {
      text: 'Phương thức thanh toán',
      caption: '',
      icon: <PaymentOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: isLoggedIn,
    },
    {
      text: 'Mã giảm giá',
      caption: '',
      icon: <CardGiftcardOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: isLoggedIn,
    },
    {
      text: 'Đăng nhập / Đăng ký',
      caption: '',
      icon: <AccountCircleOutlinedIcon className={classes.drawerButtonIcon} />,
      action: goToLogin,
      show: !isLoggedIn,
    },
    {
      text: 'Trợ giúp',
      caption: '',
      icon: <HelpOutlineOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => goToPage(ROUTES.HOME),
      show: true,
    },
    {
      text: 'Đăng xuất',
      caption: '',
      icon: <ExitToAppOutlinedIcon className={classes.drawerButtonIcon} />,
      action: () => logout(),
      show: isLoggedIn,
    },
  ]

  return (
    <>
      <Box className={classes.sideBox}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // disable on hover effect
          style={{
            backgroundColor: 'transparent',
          }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer open={drawerState} onClose={handleCloseDrawer}>
        <Box>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List style={{ width: '340px' }}>
          {optionList.map(
            (option, index) =>
              option.show && (
                <DrawerActionButton
                  key={`left-drawer-action-${index}`}
                  text={option.text}
                  caption={option.caption}
                  icon={option.icon}
                  action={option.action}
                />
              )
          )}
        </List>
      </Drawer>
    </>
  )
}

export default IconWithDrawer
