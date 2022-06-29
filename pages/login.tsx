import FirebaseAuth from '@/components/auth/FirebaseAuth'
import { Box, Paper, Typography } from '@material-ui/core'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

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
      <NextSeo
        title={'Đăng nhập'}
        description="Trang đăng nhập của EMenu"
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: 'EMenu - Mọi địa điểm trong một Menu',
          description: 'Các địa điểm ăn uống nổi bật',
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
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
          src="https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938"
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
