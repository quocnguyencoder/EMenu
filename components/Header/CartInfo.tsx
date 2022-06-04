import { Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useStyles } from '@/styles/cart'

const CartInfo = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="caption" color="textSecondary">
        {'Giỏ hàng từ'}
      </Typography>
      <Typography
        variant="h6"
        style={{ fontWeight: 'bold', cursor: 'pointer' }}
      >
        {'Quán ăn gia đình'}
        <ArrowForwardIosIcon className={classes.goToPlaceDetailIcon} />
      </Typography>
    </>
  )
}

export default CartInfo
