import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import { Snackbar } from '@material-ui/core'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import { useState } from 'react'

interface Props {
  message: {
    text: string
    severity: Color
    open: boolean
  }
  setMessage: React.Dispatch<
    React.SetStateAction<{
      text: string
      severity: Color
      open: boolean
    }>
  >
}

const SnackBar = ({ message, setMessage }: Props) => {
  const [state] = useState<SnackbarOrigin>({
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal } = state
  const handleClose = () => {
    setMessage({ ...message, open: false })
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={2000}
      open={message.open}
      key={vertical + horizontal}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={message.severity}>
        {message.text}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
