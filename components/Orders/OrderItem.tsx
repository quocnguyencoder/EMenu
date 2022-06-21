import { Bill, Place } from '@/models/place'
import { Avatar, Box, ListItemText, Paper, Typography } from '@material-ui/core'
import formatter from '@/functions/moneyFormatter'
import Link from 'next/link'
import * as ROUTES from '@/constants/routes'
import { useStyles } from '@/styles/orders'
import moment from 'moment'
import 'moment/locale/vi'
import OrderDetail from './OrderDetail'
import { useState } from 'react'

interface Props {
  placeInfo: Place
  order: Bill
}
interface Status {
  [status: string]: {
    display: JSX.Element
  }
}
moment.locale('vi')
const OrderItem = ({ order, placeInfo }: Props) => {
  const classes = useStyles()
  const status = {
    Confirmed: {
      display: (
        <Typography
          variant="body2"
          className={classes.statusText}
          style={{
            color: 'green',
          }}
        >
          Thành công
        </Typography>
      ),
    },
    Waiting: {
      display: (
        <Typography
          variant="body2"
          className={classes.statusText}
          style={{
            color: 'grey',
          }}
        >
          Đang chờ
        </Typography>
      ),
    },
    Deleted: {
      display: (
        <Typography
          variant="body2"
          className={classes.statusText}
          style={{
            color: 'red',
          }}
        >
          Hủy
        </Typography>
      ),
    },
  } as Status
  const [showDetail, setShowDetail] = useState(false)
  return (
    <Paper>
      <Box className={classes.itemWrapper}>
        <Box className={classes.avatarWrapper}>
          <Avatar
            variant="square"
            src={placeInfo.image}
            alt={placeInfo.name}
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Link href={ROUTES.PLACE_DETAIL(placeInfo.id)}>
            <Typography
              variant="body1"
              style={{ fontWeight: 'bold' }}
              className={classes.link}
            >
              {placeInfo.name}
            </Typography>
          </Link>
          <Box display="flex" alignItems="center" style={{ gap: '1rem' }}>
            {status[order.status].display}
            <Typography variant="body2">
              {moment(order.datetime).format('lll')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" style={{ gap: '1rem' }}>
            <Typography
              variant="body2"
              style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              {order.payment}
            </Typography>
            <Typography variant="body2">{order.deliveryTo}</Typography>
          </Box>
          <Typography variant="body2">{order.note}</Typography>
        </Box>

        <ListItemText
          style={{ textAlign: 'right', padding: '1rem' }}
          primary={
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {formatter.format(order.total)}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              color="secondary"
              className={classes.link}
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? 'Ẩn chi tiết' : 'Xem chi tiết'}
            </Typography>
          }
        />
      </Box>
      {showDetail && (
        <OrderDetail orderItems={order.items} total={order.total} />
      )}
    </Paper>
  )
}

export default OrderItem
