import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from '../../styles/header'
import { IconButton } from '@material-ui/core'
import { AutocompleteRenderInputParams } from '@material-ui/lab'
import CancelIcon from '@material-ui/icons/Cancel'

interface Props {
  params: AutocompleteRenderInputParams
  inputValue: string
  setInputValue: (text: string) => void
}

const SearchInput = ({ params, inputValue, setInputValue }: Props) => {
  const classes = useStyles()

  return (
    <InputBase
      placeholder="Tìm kiếm nhà hàng, quán ăn"
      classes={{
        root: classes.input,
      }}
      onChange={(e) => setInputValue(e.target.value)}
      className="search-input"
      startAdornment={<SearchIcon />}
      endAdornment={
        inputValue !== '' && (
          <IconButton
            onClick={() => setInputValue('')}
            style={{ padding: 0, marginRight: '2%', color: 'rgb(73, 73, 73)' }}
          >
            <CancelIcon />
          </IconButton>
        )
      }
      ref={params.InputProps.ref}
      inputProps={params.inputProps}
    />
  )
}

export default SearchInput
