import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import * as ROUTES from '@/constants/routes'
import { useRouter } from 'next/router'

interface Props {
  open: boolean
  handleClose: () => void
}

const LoginRequiredDialog = ({ open, handleClose }: Props) => {
  const router = useRouter()
  const gotoLogin = () => {
    router.push({
      pathname: ROUTES.LOGIN,
      query: {
        returnURL: router.asPath,
      },
    })
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Đăng nhập hệ thống'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Vui lòng đăng nhập để thực hiện chức năng này!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={gotoLogin} color="primary" autoFocus>
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginRequiredDialog
