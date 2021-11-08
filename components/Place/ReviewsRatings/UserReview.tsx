import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import moment from 'moment'

const UserReview = () => {
  return (
    <>
      <Paper style={{ backgroundColor: '#fff' }}>
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
                  <Rating name="read-only" value={3} readOnly />
                </Box>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '2%',
                  }}
                >
                  {'Ngon'}
                </Typography>
              </Box>
            }
            secondary={
              <Typography variant="body2" style={{ textAlign: 'justify' }}>
                {
                  'Mình với bạn đang kiếm quán đi ăn thì đi được 1 khúc thấy quán này đúng bự luôn á, nhưng mình thấy có bày mấy cái ghê bên ngoài, thấy để chữ bánh canh nên tấp vô ăn thử luôn xem sao. Gửi xe ở ngay quán luôn, có nhân viên trông coi. Mấy cái bàn hơi sát ngoài rìa, nên ngồi nhớ giữ tư trang, khúc đó hơi ghê 1 chút. Mình với bạn gọi: bánh canh hải sản thịt cua rỉa 60k/ phần. Một phần gồm có: thịt xương, chả cua, cua rỉa, tôm. Nước lèo ăn ngon lắm, vị thanh, cọng bánh canh ăn ngon lắm. Nói chứ chỗ này ăn cũng ổn, mình chắc chắn sẽ quay lại ăn tiếp.'
                }
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" component="div">
          <ImageList rowHeight={200} cols={5}>
            <ImageListItem>
              <img
                src={
                  'https://images.foody.vn/res/g69/684526/s/foody-giang-ghe-hai-san-song-truong-chinh-538-637205382896293498.jpg'
                }
                alt={'sss'}
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={
                  'https://images.foody.vn/res/g69/684526/s/foody-giang-ghe-hai-san-song-truong-chinh-538-637205382896293498.jpg'
                }
                alt={'sss'}
              />
            </ImageListItem>
          </ImageList>
        </ListItem>
        <ListItem component="div">
          <>
            <ListItemText
              primary={
                <Box display="flex">
                  <ThumbUpAltIcon
                    style={{
                      backgroundColor: 'orange',
                      borderRadius: '20px',
                      color: '#fff',
                      marginRight: '1%',
                    }}
                  />
                  <Typography variant="body1">{'2'}</Typography>
                </Box>
              }
            />
            <ListItemSecondaryAction style={{ paddingTop: '3%' }}>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{' 2 Bình luận'}</Typography>
                }
              />
            </ListItemSecondaryAction>
          </>
        </ListItem>
        <Divider variant="middle" />
        <ListItem>
          <Box display="flex">
            <IconButton>
              <ThumbUpOutlinedIcon />
              <Typography variant="body2">{'Hữu ích'}</Typography>
            </IconButton>
            <IconButton>
              <ChatBubbleOutlineIcon />
              <Typography variant="body2">{'Bình luận'}</Typography>
            </IconButton>
          </Box>
        </ListItem>
        <ListItem style={{ backgroundColor: '#f9f9f9', height: '50px' }}>
          <ListItemAvatar>
            <Avatar alt="Q" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body2">
                <Link
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '1%',
                  }}
                >
                  {'Quoc Nguyen'}
                </Link>
                {'Ngonnn'}
              </Typography>
            }
            secondary={moment().format('L')}
          />
        </ListItem>
        <ListItem style={{ backgroundColor: '#f9f9f9', maxHeight: '50px' }}>
          <ListItemAvatar>
            <Avatar alt="Q" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="body2">
                <Link
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '1%',
                  }}
                >
                  {'Quoc Nguyen'}
                </Link>
                {'Lần ăn lại giá lên và gà cũng ít'}
              </Typography>
            }
            secondary={moment().format('L')}
          />
        </ListItem>
        <ListItem style={{ backgroundColor: '#f9f9f9' }}>
          <ListItemAvatar>
            <Avatar alt="Q" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <InputBase
                placeholder="Bình luận"
                multiline
                minRows={1}
                maxRows={3}
                style={{
                  backgroundColor: '#fff',
                  border: '1.3px ridge #e7e7e7',
                  padding: '9px',
                  width: '100%',
                }}
              />
            }
          />
        </ListItem>
      </Paper>
    </>
  )
}

export default UserReview
