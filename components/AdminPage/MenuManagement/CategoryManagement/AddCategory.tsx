import {
  Box,
  Button,
  CardActions,
  FormControl,
  OutlinedInput,
  InputLabel,
  Snackbar,
} from '@material-ui/core'
import { useStyles } from '@/styles/modal'
import { Category } from '@/models/place'
import { SnackbarOrigin } from '@material-ui/core/Snackbar'
import type { Color } from '@material-ui/lab/Alert'
import Alert from '@material-ui/lab/Alert'
import { useState } from 'react'
import * as updateService from '@/firebase/updateDocument'

interface State extends SnackbarOrigin {
  open: boolean
}

interface Props {
  categories: Category
  placeID: string
}

const AddCategory = ({ categories, placeID }: Props) => {
  const classes = useStyles()
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })
  const { vertical, horizontal, open } = state
  const [message, setMessage] = useState({
    text: '',
    severity: 'error' as Color,
  })

  const handleOpenAlert = (text: string, severity: Color) => {
    setState({ ...state, open: true })
    setMessage({
      text: text,
      severity: severity,
    })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      newCategory: { value: string }
    }

    const temp = Object.keys(categories).map(Number).pop()
    const newCategoryID = temp === undefined ? 0 : temp + 1
    updateService.default.updateMenuCategory(placeID, {
      ...categories,
      [newCategoryID]: {
        name: target.newCategory.value,
        items: [] as number[],
      },
    })
    target.newCategory.value = ''
    handleOpenAlert(`Thêm loại món ăn thành công`, `success`)
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        open={open}
        key={vertical + horizontal}
        onClose={handleClose}
      >
        <Alert variant="filled" severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box display="flex" style={{ margin: '0 0 1% 1%' }}>
          <FormControl margin="dense" variant="outlined">
            <InputLabel>Tên loại</InputLabel>
            <OutlinedInput required name="newCategory" label="Tên loại" />
          </FormControl>
          <CardActions>
            <Button
              size="large"
              type="submit"
              className={classes.buttonLineGradient}
              variant="contained"
            >
              Xác nhận
            </Button>
          </CardActions>
        </Box>
      </form>
    </>
  )
}

export default AddCategory
