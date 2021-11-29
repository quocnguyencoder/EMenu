import { Box, Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
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
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ReviewsRatings = ({ place }: Props) => {
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const handleOpenModal = () => {
    user.id !== '' ? setOpenModal(true) : setOpenDialog(true)
  }

  const handleCloseModal = (isUploading: boolean) => {
    !isUploading && setOpenModal(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleCloseSnackBar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  return (
    <>
      <Box display="flex" flexDirection="column" flex={1}>
        <RatingOverview ratings={place.rating} />
        {place.reviews
          .slice(0)
          .reverse()
          .map((reviewID) => (
            <UserReview
              key={reviewID}
              reviewID={reviewID}
              setOpenDialog={setOpenDialog}
            />
          ))}
      </Box>
      <ReviewsInfo handleOpenModal={handleOpenModal} />
      <ReviewModal
        placeID={place.id}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        setOpenSnackBar={setOpenSnackBar}
      />
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="success">
          Đánh giá thành công
        </Alert>
      </Snackbar>
    </>
  )
}

export default ReviewsRatings
