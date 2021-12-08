import FirebaseAuth from '@/components/auth/FirebaseAuth'
import { Box, Typography } from '@material-ui/core'
import Image from 'next/image'

const Login = () => {
  return (
    <Box display={'flex'} height={'83vh'}>
      <Box
        flex={1}
        height={'100%'}
        style={{
          backgroundImage:
            'url("https://i.graphicmama.com/blog/wp-content/uploads/2019/11/06155504/menju-dlja-restorana-ginza-minimalistic-style-menu-design-with-big-images-for-inspiration.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Box>
      <Box
        width={'40%'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        style={{ paddingTop: '10%' }}
      >
        <Image
          src="./logo.png"
          alt="Picture of the author"
          width={90}
          height={50}
        />
        <Typography
          variant="subtitle1"
          style={{
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'gray',
          }}
        >
          {'Chào mừng đến với EMenu. Vui lòng đăng nhập tại đây!'}
        </Typography>
        <FirebaseAuth />
      </Box>
    </Box>
  )
}

export default Login
