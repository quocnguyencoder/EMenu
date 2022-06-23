import { Bill, Place } from '@/models/place'
import { Avatar, Box, ListItemText, Paper, Typography } from '@material-ui/core'
import formatter from '@/functions/moneyFormatter'
import Link from 'next/link'
import * as ROUTES from '@/constants/routes'
import { useStyles } from '@/styles/orders'
import moment from 'moment'
import 'moment/locale/vi'
import OrderDetail from './OrderDetail'
import { useEffect, useState } from 'react'
import FeedbackInput from './FeedbackInput'
import { Rating } from '@material-ui/lab'
import Feedback from './Feedback'

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
  const [showForm, setShowForm] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState(order.feedback)
  const hasFeedback = feedback.rating !== 0

  useEffect(() => {
    hasFeedback && setShowForm(false)
  }, [hasFeedback])

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
          <Box display="flex" alignItems="center" style={{ gap: '1rem' }}>
            <Typography
              variant="body2"
              style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              {`Đánh giá`}
            </Typography>
            {hasFeedback ? (
              <Box display="flex" alignItems="center" style={{ gap: '1rem' }}>
                <Rating
                  readOnly
                  size="small"
                  name={`${order.billID}-feedback-rating`}
                  value={feedback.rating}
                />
                <Typography
                  variant="body2"
                  color="secondary"
                  className={classes.link}
                  onClick={() => setShowFeedback(!showFeedback)}
                >
                  {showFeedback ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="primary"
                className={classes.link}
                onClick={() => setShowForm(!showForm)}
              >
                {`Viết đánh giá`}
              </Typography>
            )}
          </Box>
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
      {showForm && (
        <FeedbackInput billID={order.billID} setFeedback={setFeedback} />
      )}
      {showFeedback && <Feedback feedback={feedback} />}
    </Paper>
  )
}

export default OrderItem
