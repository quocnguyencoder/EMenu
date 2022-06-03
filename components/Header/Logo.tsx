import * as ROUTES from '@/constants/routes'
import { Box } from '@material-ui/core'
import { useRouter } from 'next/router'

import Image from 'next/image'

import { useStyles } from '@/styles/header'

const Logo = () => {
  const router = useRouter()

  const classes = useStyles()
  const gotoHomepage = () => {
    router.push(ROUTES.HOME)
  }

  return (
    <>
      <Box
        onClick={gotoHomepage}
        className={classes.logoFull}
        style={{ cursor: 'pointer' }}
      >
        <Image src="/logo.png" height="45px" width="115px" />
      </Box>
      <Box
        onClick={gotoHomepage}
        className={classes.logoSmall}
        style={{ cursor: 'pointer' }}
      >
        <Image src="/logo-small.png" height="30px" width="40px" />
      </Box>
    </>
  )
}

export default Logo
