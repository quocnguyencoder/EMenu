import React from 'react'
import { useStyles } from '@/styles/detail'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Box, Chip, Typography } from '@material-ui/core'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined'
import StarOutlinedIcon from '@material-ui/icons/StarOutlined'
import ReviewBlock from './ReviewBlock'
import AddReview from './AddReview'
const TopReviews = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      className={classes.topReviewsWrapper}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          {'Các đánh giá hàng đầu'}
        </Typography>
        <Chip
          label={
            <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
              {!isMobile && (
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  Xem thêm
                </Typography>
              )}
              <ArrowForwardOutlinedIcon fontSize="small" />
            </Box>
          }
          clickable
          className={classes.chip}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          4.5
        </Typography>
        <StarOutlinedIcon fontSize="small" style={{ color: '#f7ac0a' }} />
        <Typography
          variant="body1"
          color="secondary"
          style={{ marginLeft: '0.5rem', fontWeight: 500 }}
        >
          10 ratings
        </Typography>
      </Box>
      <Box display="flex" overflow="scroll auto" pt={2} style={{ gap: '1rem' }}>
        <AddReview />
        <ReviewBlock />
        <ReviewBlock />
        <ReviewBlock />
        <ReviewBlock />
        <ReviewBlock />
        <ReviewBlock />
      </Box>
    </Box>
  )
}

export default TopReviews
