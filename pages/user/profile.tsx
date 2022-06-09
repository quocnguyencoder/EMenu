import { Container } from '@material-ui/core'
import InfoForm from '@/components/User/InfoForm'
import { NextSeo } from 'next-seo'
const profile = () => {
  return (
    <Container
      style={{
        display: 'flex',
        gap: '4%',
        paddingTop: '2%',
        minHeight: '80vh',
      }}
    >
      <NextSeo
        title={'Hồ sơ cá nhân của bạn'}
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
      <InfoForm />
    </Container>
  )
}

export default profile
