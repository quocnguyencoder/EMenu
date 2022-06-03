import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { Bill } from '@/models/place'
import formatter from '@/functions/moneyFormatter'
import { FaMoneyBillWave } from 'react-icons/fa'

interface Props {
  orderList: Bill[]
}

const TotalRevenue = ({ orderList }: Props) => {
  const revenue = orderList.reduce(
    (total, order) =>
      order.status === 'Confirmed' ? total + order.total : total,
    0
  )

  return (
    <Box flex="1" m="1%">
      <Paper style={{ padding: '5%' }}>
        <Typography variant="subtitle2">Tổng doanh thu</Typography>
        <Box display="flex">
          <Typography
            variant="h6"
            style={{
              fontWeight: 600,
              alignSelf: 'center',
              width: '100%',
            }}
          >
            {formatter.format(revenue)}
          </Typography>
          <FaMoneyBillWave size="15%" color="green" />
        </Box>
      </Paper>
    </Box>
  )
}

export default TotalRevenue
