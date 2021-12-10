import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import useUser from '@/firebase/useUser'
import ChatRoundedIcon from '@material-ui/icons/ChatRounded'
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'

const NavBar = () => {
  const { user } = useUser()
  return (
    <Paper
      variant="outlined"
      square
      style={{
        backgroundColor: '#fff',
        padding: '1%',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 70,
      }}
    >
      <ListItem
        component="div"
        style={{ paddingTop: '5%', paddingBottom: '6%' }}
      >
        <ListItemAvatar>
          <Avatar src={user.profilePic} alt={`${user.name}'s avatar'`} />
        </ListItemAvatar>
        <Typography variant="body2" style={{ fontWeight: 600 }}>
          {user.name}
        </Typography>
      </ListItem>
      <Divider />
      <List component="nav" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItem
          button
          selected={true}
          style={{ paddingTop: 5, paddingBottom: 5 }}
        >
          <ListItemIcon style={{ width: '100%' }}>
            <AccountCircleRoundedIcon
              style={{ marginTop: '2%', color: 'green' }}
            />
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    marginLeft: '1%',
                    fontWeight: 700,
                    color: '#bc0000',
                  }}
                >
                  {'Thông tin tài khoản'}
                </Typography>
              }
            />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button style={{ paddingTop: 5, paddingBottom: 5 }}>
          <ListItemIcon style={{ width: '100%' }}>
            <ChatRoundedIcon style={{ marginTop: '2%', color: '#03a5fc' }} />
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    marginLeft: '1%',
                    fontWeight: 700,
                    color: 'black',
                  }}
                >
                  {'Đánh giá'}
                </Typography>
              }
            />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button style={{ paddingTop: 5, paddingBottom: 5 }}>
          <ListItemIcon style={{ width: '100%' }}>
            <BookmarkRoundedIcon style={{ marginTop: '2%', color: 'orange' }} />
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    marginLeft: '1%',
                    fontWeight: 700,
                    color: 'black',
                  }}
                >
                  {'Lưu trữ'}
                </Typography>
              }
            />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button style={{ paddingTop: 5, paddingBottom: 5 }}>
          <ListItemIcon style={{ width: '100%' }}>
            <ListAltRoundedIcon style={{ marginTop: '2%', color: '#6f03fc' }} />
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    marginLeft: '1%',
                    fontWeight: 700,
                    color: 'black',
                  }}
                >
                  {'Lịch sử gọi món'}
                </Typography>
              }
            />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button style={{ paddingTop: 5, paddingBottom: 5 }}>
          <ListItemIcon style={{ width: '100%' }}>
            <ExitToAppRoundedIcon style={{ marginTop: '2%', color: 'gray' }} />
            <ListItemText
              primary={
                <Typography
                  variant="caption"
                  style={{
                    marginLeft: '1%',
                    fontWeight: 700,
                    color: 'gray',
                  }}
                >
                  {'Đăng xuất'}
                </Typography>
              }
            />
          </ListItemIcon>
        </ListItem>
      </List>
    </Paper>
  )
}

export default NavBar
