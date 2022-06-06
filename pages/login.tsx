import FirebaseAuth from '@/components/auth/FirebaseAuth'
import { Box, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'

const Login = () => {
  return (
    <Box
      height={'100%'}
      minHeight="85vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundImage:
          'url("https://i.graphicmama.com/blog/wp-content/uploads/2019/11/06155504/menju-dlja-restorana-ginza-minimalistic-style-menu-design-with-big-images-for-inspiration.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem 0',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        <Image
          src="./logo.png"
          alt="Picture of the author"
          width={110}
          height={50}
        />
        <Typography
          variant="subtitle1"
          style={{
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'gray',
            width: '80%',
            textAlign: 'center',
          }}
        >
          {'Chào mừng đến với EMenu. Vui lòng đăng nhập tại đây!'}
        </Typography>
        <FirebaseAuth />
      </Paper>
    </Box>
  )
}

export default Login
