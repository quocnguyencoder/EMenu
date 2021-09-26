import { Box, InputBase, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import { useState } from 'react'

interface Props {
  categories: string[]
  setFilterCategories: any
}
export default function SearchBar({ categories, setFilterCategories }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnChange = (e: any) => {
    setSearchTerm(e.target.value)
    setFilterCategories(
      categories.filter((category) =>
        category.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  const clearSearch = () => {
    setSearchTerm('')
    setFilterCategories(categories)
  }

  return (
    <Box display="flex" boxShadow="none">
      <InputBase
        style={{ backgroundColor: '#DADDE0', flex: 1 }}
        onChange={handleOnChange}
        placeholder="Search"
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
