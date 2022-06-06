import { Container } from '@material-ui/core'
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
      <InfoForm />
    </Container>
  )
}

export default profile
