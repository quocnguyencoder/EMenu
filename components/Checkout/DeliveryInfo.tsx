import {
  Box,
  FormControlLabel,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import React from 'react'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'

const DeliveryInfo = () => {
  return (
    <Paper variant="outlined" style={{ marginBottom: '1rem' }}>
      <Box display="flex" alignItems="center" p={1}>
        <InfoOutlinedIcon />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Thông tin giao nhận
        </Typography>
      </Box>
      <ListItem component="span">
        <ListItemText
          style={{ width: '50%' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <AccountCircleOutlinedIcon />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Khách hàng
              </Typography>
            </Box>
          }
        />
        <ListItemText primary="Nguyễn Đức Minh Quốc" />
      </ListItem>
      <ListItem component="span">
        <ListItemText
          style={{ width: '42%' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <PinDropOutlinedIcon />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Hình thức
              </Typography>
            </Box>
          }
        />
        <ListItemText
          primary={
            <RadioGroup>
              <FormControlLabel
                label="Tại quán"
                value="at-place"
                checked
                control={<Radio />}
              />
              <FormControlLabel
                label="Giao tận nơi"
                value="deliver"
                control={<Radio />}
              />
            </RadioGroup>
          }
        />
      </ListItem>
      <ListItem component="span">
        <ListItemText
          style={{ width: '50%' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <HomeOutlinedIcon />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Địa chỉ
              </Typography>
            </Box>
          }
        />
        <ListItemText
          primary={
            <TextField
              placeholder="Nhập địa chỉ"
              name="address"
              multiline
              maxRows={3}
              required
              inputProps={{
                pattern: '.*[^ |\t].*',
                title: 'Ít nhất có 1 ký tự',
              }}
              style={{ width: '100%' }}
            />
          }
        />
      </ListItem>
      <ListItem component="span">
        <ListItemText
          style={{ width: '50%' }}
          primary={
            <Box display="flex" alignItems="center" style={{ gap: '0.5rem' }}>
              <CallOutlinedIcon />
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Điện thoại
              </Typography>
            </Box>
          }
        />
        <ListItemText
          primary={
            <TextField
              placeholder="Nhập số điện thoại"
              name="address"
              multiline
              maxRows={3}
              required
              inputProps={{
                pattern: '([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})',
                title: '0x88888888 hoặc +84x88888888',
              }}
              style={{ width: '100%' }}
            />
          }
        />
      </ListItem>
    </Paper>
  )
}

export default DeliveryInfo
