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
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938"
          alt="logo"
          layout="fixed"
          height="45em"
          width="100em"
        />
      </Box>
      <Box
        onClick={gotoHomepage}
        className={classes.logoSmall}
        style={{ cursor: 'pointer' }}
      >
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo-small.png?alt=media&token=513d4270-5978-4e07-98d1-5612411dcae6"
          height="30em"
          width="30em"
          layout="fixed"
          alt="small logo"
        />
      </Box>
    </>
  )
}

export default Logo
