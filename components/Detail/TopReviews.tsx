import React from 'react'
import { useStyles } from '@/styles/detail'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Box, Chip, Divider, Typography } from '@material-ui/core'
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined'
import StarOutlinedIcon from '@material-ui/icons/StarOutlined'
import ReviewBlock from './ReviewBlock'
import AddReview from './AddReview'
import { RatingList } from '@/models/place'
import { toAvgRating } from '@/helpers/toAvgRating'

interface Props {
  placeID: string
  reviews: string[]
  ratings: RatingList
}

const TopReviews = ({ placeID, ratings, reviews }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const ratingsCount = ratings ? Object.keys(ratings).length : 0
  const avgRating = ratings ? toAvgRating(ratings) : 0

  return (
    <Box
      className={classes.topReviewsWrapper}
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          {ratingsCount !== 0
            ? 'Các bài đánh giá hàng đầu'
            : 'Hãy là người đầu tiên đánh giá địa điểm này'}
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
          {avgRating}
        </Typography>
        <StarOutlinedIcon fontSize="small" style={{ color: '#f7ac0a' }} />
        <Typography
          variant="body1"
          color="secondary"
          style={{ marginLeft: '0.5rem', fontWeight: 500 }}
        >
          {`${ratingsCount} đánh giá`}
        </Typography>
      </Box>
      <Box display="flex" overflow="scroll auto" pt={2} style={{ gap: '1rem' }}>
        <AddReview placeID={placeID} />
        {reviews &&
          reviews.map((reviewID) => (
            <ReviewBlock key={`review-${reviewID}`} reviewID={reviewID} />
          ))}
      </Box>
      <Divider style={{ marginTop: '1.5rem' }} />
    </Box>
  )
}

export default TopReviews
