import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Backdrop,
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
  Paper,
  Typography,
} from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating'
import { useStyles } from '../../../styles/place'

interface Props {
  openModal: boolean
  handleCloseModal: () => void
}

const ReviewModal = ({ openModal, handleCloseModal }: Props) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const classes = useStyles()

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files[0] === undefined) {
      return
    } else {
      setSelectedImages([...selectedImages, e.target.files[0]])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newSelectedImages = [...selectedImages]
    newSelectedImages.splice(index, 1)
    setSelectedImages(newSelectedImages)
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.reviewModalWrapper}
    >
      <Fade in={openModal}>
        <Paper className={classes.reviewModalPaper}>
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
              onClick={() => handleCloseModal()}
              style={{ marginLeft: 'auto' }}
            >
              <CancelRoundedIcon fontSize="large" />
            </IconButton>
          </Box>
          <Divider variant="middle" />
          <ListItem style={{ paddingBottom: 0 }}>
            <ListItemAvatar>
              <Avatar alt="Q" style={{ width: '50px', height: '50px' }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  {'Quoc'}
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
                    <Rating name="user-ratings" />
                  </Box>
                  <InputBase
                    placeholder="Đánh giá chung"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 'large',
                      width: '100%',
                    }}
                  />
                  <InputBase
                    placeholder="Thêm mô tả"
                    multiline
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
              <label htmlFor="select-image">
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
              </label>
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
          <Button className={classes.reviewModalSubmitButton}>Hoàn tất</Button>
        </Paper>
      </Fade>
    </Modal>
  )
}

export default ReviewModal
