import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Backdrop,
  ClickAwayListener,
  Divider,
  Fade,
  InputBase,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Tooltip,
  Paper,
  Typography,
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import Rating from '@material-ui/lab/Rating'
import moment from 'moment'
import 'moment/locale/vi'
import { useStyles } from '../../../styles/place'
import useUser from '@/firebase/useUser'
import * as uploadService from '@/firebase/filesUpload'
import * as writeService from '@/firebase/writeDocument'
import * as updateService from '@/firebase/updateDocument'
import Loading from '@/components/common/Loading'

interface Props {
  placeID: string
  openModal: boolean
  handleCloseModal: (isUploading: boolean) => void
}

interface UserInputs {
  subject: string
  content: string
}

const ReviewModal = ({ placeID, openModal, handleCloseModal }: Props) => {
  moment.locale('vi')
  const { user } = useUser()
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [inputs, setInputs] = useState({})
  const [ratingValue, setRatingValue] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [openTooltip, setOpenTooltip] = useState(false)
  const classes = useStyles()

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else {
      selectedImages.length < 11
        ? setSelectedImages([...selectedImages, e.target.files[0]])
        : setOpenTooltip(true)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newSelectedImages = [...selectedImages]
    newSelectedImages.splice(index, 1)
    setSelectedImages(newSelectedImages)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleUploadReview = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    const userInputs = inputs as UserInputs
    if (userInputs.subject !== '') {
      setIsUploading(true)
      try {
        const imgURLs =
          await uploadService.default.handleFilesUploadOnFirebaseStorage(
            user.id,
            selectedImages
          )
        //console.log('urls: ', imgURLs)

        const userReview = {
          userID: user.id,
          subject: userInputs.subject,
          content: userInputs.content || '',
          date: moment().format('DD MM YYYY, h:mm:ss a'),
          files: imgURLs,
          rating: ratingValue,
        }
        writeService.default
          .writeReviewOnFirebase(userReview)
          .then((reviewID) => {
            //console.log('reviewID: ', reviewID)
            updateService.default.updatePlaceReview(reviewID, placeID)

            updateService.default.updateUserReview(reviewID, user.id)

            updateService.default.updatePlaceRating(
              placeID,
              user.id,
              reviewID,
              ratingValue,
              userReview.date
            )
          })
      } finally {
        setIsUploading(false)
        handleCloseModal(isUploading)
      }
    }
  }
  const handleTooltipOpen = () => {
    selectedImages.length === 10 && setOpenTooltip(true)
  }
  const handleTooltipClose = () => {
    setOpenTooltip(false)
  }

  return (
    <Modal
      open={openModal}
      onClose={() => handleCloseModal(isUploading)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.reviewModalWrapper}
    >
      <Fade in={openModal}>
        <Paper
          onSubmit={(e) => handleUploadReview(e)}
          className={classes.reviewModalPaper}
          component="form"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton style={{ marginRight: 'auto', visibility: 'hidden' }}>
              <CancelOutlinedIcon />
            </IconButton>
            <Typography
              variant="h6"
              style={{
                color: '#E37F68',
                fontWeight: 600,
              }}
            >
              {'Viết bài đánh giá'}
            </Typography>
            <IconButton
              onClick={() => handleCloseModal(isUploading)}
              style={{ marginLeft: 'auto' }}
            >
              <CancelRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider variant="middle" />
          <ListItem style={{ paddingBottom: 0 }}>
            <ListItemAvatar>
              <Avatar
                src={user.profilePic}
                alt="User ava"
                style={{ width: '50px', height: '50px' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {user.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2">{moment().format('L')}</Typography>
              }
            />
          </ListItem>
          <ListItem style={{ paddingTop: 0 }}>
            <ListItemText
              primary={
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      {'Xếp hạng: '}
                    </Typography>
                    <Rating
                      name="user-ratings"
                      value={ratingValue}
                      onChange={(event, newValue) =>
                        setRatingValue(newValue || 0)
                      }
                    />
                  </Box>
                  <InputBase
                    name="subject"
                    placeholder="Đánh giá chung (bắt buộc)"
                    required
                    autoComplete="false"
                    inputProps={{ maxLength: 50 }}
                    onChange={handleInputChange}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 'large',
                      width: '100%',
                    }}
                  />
                  <InputBase
                    name="content"
                    placeholder="Nội dung (tùy chọn)"
                    autoComplete="false"
                    onChange={handleInputChange}
                    multiline
                    inputProps={{ maxLength: 1000 }}
                    rows={5}
                    style={{
                      width: '100%',
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
          <ImageList cols={5} style={{ margin: '2%', flex: 1 }}>
            <ImageListItem
              style={{
                height: '100%',
                overflow: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={(e) => handleSelectImage(e)}
              />
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <label htmlFor="select-image">
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    onOpen={handleTooltipOpen}
                    open={openTooltip}
                    placement="top"
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Bạn chỉ có thể thêm tối đa 10 ảnh"
                  >
                    <ButtonBase
                      component="span"
                      style={{
                        backgroundColor: '#e7e7e7',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <AddAPhotoIcon fontSize="large" />
                      <Typography variant="body2">Thêm ảnh</Typography>
                    </ButtonBase>
                  </Tooltip>
                </label>
              </ClickAwayListener>
            </ImageListItem>
            {selectedImages.length > 0 &&
              selectedImages.map((image, index) => (
                <ImageListItem
                  key={`selected-image-${index}`}
                  style={{ height: '100%' }}
                >
                  <img src={URL.createObjectURL(image)} loading="lazy" />
                  <ImageListItemBar
                    position="top"
                    actionIcon={
                      <IconButton
                        size="small"
                        style={{
                          backgroundColor: '#fff',
                          color: 'red',
                          padding: '0',
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CancelRoundedIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                    style={{
                      backgroundColor: 'transparent',
                      paddingBottom: '17%',
                      paddingLeft: '60%',
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
          <Button type="submit" className={classes.reviewModalSubmitButton}>
            Hoàn tất
          </Button>
          {isUploading && <Loading />}
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ReviewModal
