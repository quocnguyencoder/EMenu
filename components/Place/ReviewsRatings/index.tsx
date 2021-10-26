import { useState } from 'react'
import UserReview from './UserReview'
import RatingOverview from './RatingOverview'
import ReviewsInfo from './ReviewsInfo'
import ReviewModal from './ReviewModal'
import { Box } from '@material-ui/core'

const ReviewsRatings = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <>
      <Box display="flex" flexDirection="column" flex={1}>
        <RatingOverview />
        <UserReview />
      </Box>
      <ReviewsInfo handleOpenModal={handleOpenModal} />
      <ReviewModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </>
  )
}

export default ReviewsRatings
