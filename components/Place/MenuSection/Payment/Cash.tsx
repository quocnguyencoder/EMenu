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
      onClick={() => handlePayment(items, '', 'Cash', 'Waiting', userID, total)}
      variant="contained"
      startIcon={<MoneyRoundedIcon />}
      style={{
        color: '#FFFFFF',
        backgroundColor: '#33CC33',
        width: '65%',
      }}
    >
      Cash
    </Button>
  )
}

export default Cash
