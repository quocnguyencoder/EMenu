import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded'
import { Button } from '@material-ui/core/'
import { Order } from '@/models/place'

interface Props {
  userID: string
  items: Order[]
  total: number
  handlePayment: (
    items: Order[],
    note: string,
    payment: string,
    status: string,
    userID: string,
    total: number
  ) => void
}

const Cash = ({ userID, items, total, handlePayment }: Props) => {
  return (
    <Button
      onClick={() =>
        handlePayment(items, '', 'Tiền mặt', 'Waiting', userID, total)
      }
      variant="contained"
      startIcon={<MoneyRoundedIcon />}
      style={{
        color: '#FFFFFF',
        backgroundColor: '#33CC33',
        width: '100%',
        height: '3.3rem',
        marginBottom: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      Thanh toán tiền mặt
    </Button>
  )
}

export default Cash
