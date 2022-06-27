import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core'
import moment from 'moment'
import StarIcon from '@material-ui/icons/Star'
import { BillDetail } from '@/models/place'

interface Props {
  orderList: BillDetail[]
  date: string
  dateOfMonth: string[]
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

interface RatingDisplay {
  [status: string]: number
}

const RatingStatistic = ({
  orderList,
  date,
  dateOfMonth,
  handleChange,
}: Props) => {
  const statistic: RatingDisplay = {
    'Chưa được đánh giá': 0,
    '1-2': 0,
    '3': 0,
    '4-5': 0,
  }

  orderList
    .filter((order) => moment(order.datetime).format('DD-MM-yyyy') === date)
    .map((order) => {
      if (order.feedback.rating === 0) statistic['Chưa được đánh giá'] += 1
      else if (order.feedback.rating === 1 || order.feedback.rating === 2)
        statistic['1-2'] += 1
      else if (order.feedback.rating === 3) statistic['3'] += 1
      else statistic['4-5'] += 1
    })

  return (
    <Box m="1%">
      <Typography
        variant="h6"
        style={{
          fontWeight: 600,
        }}
      >
        Đánh giá đơn hàng theo ngày
      </Typography>
      <Paper style={{ display: 'flex', padding: '2%', gap: '3%' }}>
        <FormControl variant="outlined">
          <InputLabel>Chọn ngày</InputLabel>
          <Select value={date} onChange={handleChange} label="Age">
            {dateOfMonth.map((DoM, i) => (
              <MenuItem key={`select-date-${DoM}-${i}`} value={DoM}>
                {DoM}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {Object.keys(statistic)
          .map(String)
          .sort((a, b) => (a > b ? 1 : -1))
          .map((status) => (
            <Paper
              key={`${status}`}
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                paddingLeft: '1%',
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontWeight: 600,
                  alignSelf: 'center',
                }}
              >
                {`${status}`}
              </Typography>
              {status !== 'Chưa được đánh giá' && (
                <StarIcon style={{ color: 'orange', marginRight: '1rem' }} />
              )}
              <Typography
                variant="body1"
                style={{
                  fontWeight: 600,
                  alignSelf: 'center',
                }}
              >
                {`${statistic[status]}`} đánh giá
              </Typography>
            </Paper>
          ))}
      </Paper>
    </Box>
  )
}

export default RatingStatistic
