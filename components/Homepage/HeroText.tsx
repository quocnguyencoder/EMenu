import { Box, Typography } from '@material-ui/core'

import React from 'react'

const HeroText = () => {
  return (
    <Box display="flex" flexDirection="column" paddingTop="2%">
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        {'Địa điểm gần bạn'}
      </Typography>
      <Typography
        variant="body2"
        style={{ fontWeight: 'bold', color: '#1a0e01', marginTop: '1%' }}
      >
        {'Khám phá những địa điểm nổi bật gần bạn'}
      </Typography>
    </Box>
  )
}

export default HeroText
