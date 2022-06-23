import { Bill } from '@/models/place'
import { Box, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import { GiChart } from 'react-icons/gi'
import { BiLineChartDown } from 'react-icons/bi'

interface Props {
  orderList: Bill[]
  months: string[]
}

const Revenue = ({ orderList, months }: Props) => {
  const totalOrdersByMonth = months.map((month) =>
    orderList.filter(
      (orderList) =>
        new Date(month).getMonth() === new Date(orderList.datetime).getMonth()
    )
  )

  const totalIncomeByMonth = totalOrdersByMonth.map((orders) =>
    orders.reduce(
      (pre, income) =>
        income.status === 'Confirmed' ? pre + income.total : pre,
      0
    )
  )

  const revenue = () => {
    const indexOfThisMonth = Number(moment().format('M')) - 1
    let revenueThisMonth
    let revenueLastMonth
    if (indexOfThisMonth === 0) {
      revenueThisMonth = totalIncomeByMonth[indexOfThisMonth]
      revenueLastMonth = totalIncomeByMonth[11]
    } else {
      revenueThisMonth = totalIncomeByMonth[indexOfThisMonth]
      revenueLastMonth = totalIncomeByMonth[indexOfThisMonth - 1]
    }
    return calculation(revenueThisMonth, revenueLastMonth)
  }

  const calculation = (revenueThisMonth: number, revenueLastMonth: number) => {
    if (revenueThisMonth === 0 || revenueLastMonth === 0) {
      if (revenueLastMonth === 0) return revenueThisMonth / 1000
      else return -revenueLastMonth / 1000
    } else {
      return ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
    }
  }

  return (
    <Box flex="1" m="1%">
      <Paper style={{ padding: '5%' }}>
        <Typography variant="subtitle2">
          Doanh thu tháng {moment().format('M')}/2022
        </Typography>
        <Box display="flex">
          <Typography
            variant="h6"
            style={{
              fontWeight: 600,
              alignSelf: 'center',
              width: '100%',
              color:
                revenue() < 0 ? 'red' : revenue() > 0 ? '#00FF7F' : '#00BFFF',
            }}
          >
            {`${revenue().toFixed(2)}%`}
          </Typography>
          {revenue() < 0 ? (
            <BiLineChartDown size="15%" color="red" />
          ) : (
            <GiChart size="15%" color="#00FF7F" />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default Revenue
