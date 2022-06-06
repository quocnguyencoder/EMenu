import { Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useStyles } from '@/styles/cart'
import { Place } from '@/models/place'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'

interface Props {
  placeInfo: Place
}

const CartInfo = ({ placeInfo }: Props) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="caption" color="textSecondary">
        {'Giỏ hàng từ'}
      </Typography>
      <Typography
        variant="h6"
        onClick={() => router.push(ROUTES.PLACE_DETAIL(placeInfo.id))}
        style={{ fontWeight: 'bold', cursor: 'pointer', maxWidth: '95%' }}
      >
        {placeInfo.name}
        <ArrowForwardIosIcon className={classes.goToPlaceDetailIcon} />
      </Typography>
    </>
  )
}

export default CartInfo
