import { Box, Button, Paper, TextField, Typography } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import incredients from 'assets/incredients.json'
import nonAccentVietnamese from '@/functions/nonAccentVietnamese'
import { Autocomplete } from '@material-ui/lab'
import { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import ItemIncredients from './ItemIncredients'
import { Incredient, MenuItemIncredients } from '@/models/incredient'

interface IncredientsProps {
  itemIncredient: MenuItemIncredients
  setItemIncredient: React.Dispatch<React.SetStateAction<MenuItemIncredients>>
}

interface tempProps extends Incredient {
  firstLetter: string
}

const Incredients = ({
  itemIncredient,
  setItemIncredient,
}: IncredientsProps) => {
  const classes = useStyles()
  const [selected, setSelected] = useState<tempProps | null>(null)
  const options: tempProps[] = (incredients as Incredient[]).map((option) => {
    const firstLetter = option.name[0]
    return {
      firstLetter: /[0-9]/.test(firstLetter)
        ? '0-9'
        : nonAccentVietnamese(firstLetter).toUpperCase(),
      ...option,
    }
  })

  const handleConfirm = () => {
    selected &&
      !Object.keys(itemIncredient).map(Number).includes(selected.id) &&
      setItemIncredient({
        ...itemIncredient,
        [selected.id]: { weight: 0 },
      })
  }

  return (
    <Paper
      variant="outlined"
      style={{ marginBottom: '1rem', marginTop: '1rem' }}
    >
      <Box
        display="flex"
        justifyContent="center"
        p={1}
        style={{ color: '#D14B28' }}
      >
        <FastfoodIcon style={{ marginRight: '0.5%' }} />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Thành phần
        </Typography>
      </Box>
      <Box m="1%" display="flex" style={{ gap: '1%' }}>
        <Autocomplete
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          onChange={(e, value) => setSelected(value)}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Nguyên liệu" variant="outlined" />
          )}
          style={{ flex: '6' }}
          getOptionSelected={() => true}
        />
        <Button
          className={classes.button}
          disabled={selected == null ? true : false}
          variant="contained"
          onClick={handleConfirm}
        >
          Thêm nguyên liệu
        </Button>
      </Box>
      {Object.keys(itemIncredient).map(Number).length > 0 && (
        <Box display="flex" p={1}>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', flex: '1', textAlign: 'center' }}
          >
            Tên
          </Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', flex: '1', textAlign: 'center' }}
          >
            Khối lượng
          </Typography>
        </Box>
      )}
      {Object.keys(itemIncredient)
        .map(Number)
        .map((incredient) => (
          <ItemIncredients
            key={`${incredient}`}
            itemIncredient={itemIncredient}
            setItemIncredient={setItemIncredient}
            index={incredient}
            incredientList={incredients}
          />
        ))}
    </Paper>
  )
}

export default Incredients

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      flex: '1',
      backgroundColor: '#00A98F',
      '&:hover': {
        backgroundColor: '#F9A54A',
      },
    },
  })
)
