import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from '../../styles/header'
import { IconButton } from '@material-ui/core'
import CropFreeIcon from '@material-ui/icons/CropFree'
import { AutocompleteRenderInputParams } from '@material-ui/lab'

interface Props {
  params: AutocompleteRenderInputParams
}

const SearchInput = ({ params }: Props) => {
  const classes = useStyles()
  return (
    <InputBase
      placeholder="Tìm kiếm địa điểm"
      classes={{
        root: classes.inputRoot,
      }}
      style={{
        paddingLeft: '10px',
        border: '1.3px ridge #f2f2f2',
      }}
      startAdornment={<SearchIcon />}
      endAdornment={
        <IconButton>
          <CropFreeIcon />
        </IconButton>
      }
      ref={params.InputProps.ref}
      inputProps={params.inputProps}
    />
  )
}

export default SearchInput
