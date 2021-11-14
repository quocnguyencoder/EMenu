import { Box } from '@material-ui/core'
import { useState } from 'react'
import UserReview from './UserReview'
import RatingOverview from './RatingOverview'
import ReviewsInfo from './ReviewsInfo'
import ReviewModal from './ReviewModal'
import LoginRequiredDialog from '@/components/common/LoginRequiredDialog'
import useUser from '@/firebase/useUser'
import { Place } from '@/models/place'

interface Props {
  place: Place
}

const ReviewsRatings = ({ place }: Props) => {
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenModal = () => {
    user.id !== '' ? setOpenModal(true) : setOpenDialog(true)
  }

  const handleCloseModal = (isUploading: boolean) => {
    !isUploading && setOpenModal(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Box display="flex" flexDirection="column" flex={1}>
        <RatingOverview ratings={place.rating} />
        {place.reviews.reverse().map((reviewID) => (
          <UserReview key={reviewID} reviewID={reviewID} />
        ))}
      </Box>
      <ReviewsInfo handleOpenModal={handleOpenModal} />
      <ReviewModal
        placeID={place.id}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  )
}

export default ReviewsRatings
