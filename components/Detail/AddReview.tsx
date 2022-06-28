import { Paper, Snackbar, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import useUser from '@/firebase/useUser'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import Alert from '../common/Alert'
import ReviewModal from '../shared/ReviewModal'

interface Props {
  placeID: string
}

const AddReview = ({ placeID }: Props) => {
  const { user } = useUser()
  const isLoggedIn = user.id !== ''
  const [openModal, setOpenModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [ratingValue, setRatingValue] = useState(0)

  const handleOpenModal = () => {
    isLoggedIn ? setOpenModal(true) : setOpenDialog(true)
  }

  const openModalWithRating = (rating: number) => {
    setRatingValue(rating)
    handleOpenModal()
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

  useEffect(() => {
    !openModal && setRatingValue(0)
  }, [openModal])

  return (
    <>
      <Paper
        elevation={0}
        onClick={() => handleOpenModal()}
        style={{
          minWidth: '19rem',
          height: '9rem',
          padding: '1.2rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '15%',
          backgroundColor: 'rgb(247, 247, 247)',
        }}
      >
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {isLoggedIn ? user.name : 'Khách'}
        </Typography>

        <Rating
          value={ratingValue}
          name="rating input"
          size="large"
          onChange={(event, newValue) => {
            openModalWithRating(newValue || 0)
          }}
          emptyIcon={
            <StarBorderIcon style={{ color: 'black' }} fontSize="inherit" />
          }
        />
        <Typography variant="body2">Viết bài đánh giá</Typography>
      </Paper>
      <ReviewModal
        placeID={placeID}
        openModal={openModal}
        defaultRating={ratingValue}
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

export default AddReview
