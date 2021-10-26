import { Box, Paper, Typography } from '@material-ui/core'
import { Chart } from 'react-google-charts'
import Rating from '@material-ui/lab/Rating'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

const RatingOverview = () => {
  return (
    <Paper
      elevation={3}
      variant="outlined"
      square
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" style={{ marginLeft: '3%', paddingTop: '1%' }}>
        {'Reviews'}
      </Typography>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          ml="5%"
        >
          <Typography variant="h2">{'4.5'}</Typography>
          <Rating name="read-only" value={4.5} readOnly precision={0.5} />
          <Box display="flex">
            <PermIdentityIcon fontSize="small" />
            <Typography variant="subtitle2">{'10,000 total'}</Typography>
          </Box>
        </Box>
        <Chart
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Rating', 'Total', { role: 'style' }],
            ['5*', 60, '#79C9A1'],
            ['4*', 40, '#AED888'],
            ['3*', 20, '#FFD935'],
            ['2*', 10, '#FFB235'],
            ['1*', 1, '#FF8C5A'],
          ]}
          options={{
            bar: { groupWidth: '80%' },
            legend: { position: 'none' },
            hAxis: {
              baselineColor: '#fff',
              gridlineColor: '#fff',
              textPosition: 'none',
            },
            axisFontSize: 0,
          }}
          style={{ flex: 1, height: '160px' }}
        />
      </Box>
    </Paper>
  )
}

export default RatingOverview
