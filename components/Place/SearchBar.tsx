import { Box, InputBase, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

interface Props {
  searchTerm: string
  setSearchTerm: (value: string) => void
}
export default function SearchBar({ searchTerm, setSearchTerm }: Props) {
  const handleOnChange = (userInput: string) => {
    setSearchTerm(userInput)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <Box display="flex" style={{ padding: '2%' }}>
      <InputBase
        style={{ flex: 1 }}
        onChange={(e) => handleOnChange(e.target.value)}
        placeholder="Tìm món"
        value={searchTerm}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {searchTerm === '' ? (
              <></>
            ) : (
              <IconButton size="small" onClick={() => clearSearch()}>
                <ClearIcon fontSize="small" color="disabled" />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </Box>
  )
}
