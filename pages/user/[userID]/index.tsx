import { Box, Container } from '@material-ui/core'
import NavBar from '@/components/User/NavBar'
import InfoForm from '@/components/User/InfoForm'

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
      <Box width="20%">
        <NavBar />
      </Box>
      <InfoForm />
    </Container>
  )
}

export default profile
