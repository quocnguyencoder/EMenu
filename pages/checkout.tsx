import { Container } from '@material-ui/core'
import InfoHeader from '@/components/Checkout/InfoHeader'
import DeliveryInfo from '@/components/Checkout/DeliveryInfo'
import OrderDetail from '@/components/Checkout/OrderDetail'

const Checkout = () => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
      <InfoHeader />
      <DeliveryInfo />
      <OrderDetail />
    </Container>
  )
}

export default Checkout
