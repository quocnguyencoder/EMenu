import { ButtonBase, InputBase, Paper, Typography } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { useStyles } from '@/styles/hero'

const AddressInput = () => {
  const classes = useStyles()
  return (
    <Paper component={'form'} className={classes.addressInputContainer}>
      <InputBase
        placeholder="Nhập vị trí hiện tại"
        startAdornment={<LocationOnOutlinedIcon style={{ margin: '10px' }} />}
        className={classes.addressInput}
      />
      <ButtonBase className={classes.searchButton}>
        <Typography variant="body2" className={classes.buttonFullText}>
          {'Tìm kiếm địa điểm'}
        </Typography>
        <Typography variant="body2" className={classes.buttonText}>
          {'Tìm kiếm'}
        </Typography>
      </ButtonBase>
    </Paper>
  )
}

export default AddressInput
