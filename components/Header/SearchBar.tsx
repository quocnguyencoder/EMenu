import { useEffect, useState } from 'react'
import { useStyles } from '@/styles/header'
import { Box, Popper, Typography } from '@material-ui/core'
import * as getService from '@/firebase/getDocument'
import { Place } from '@/models/place'
import { Autocomplete } from '@material-ui/lab'
import SearchResult from './SearchResult'
import SearchInput from './SearchInput'

const SearchBar = () => {
  const classes = useStyles()
  const [placesData, setPlaceData] = useState<Place[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getService.default.getAllPlaces().then((data) => setPlaceData(data))
  }, [])

  return (
    <Box className={classes.search}>
      <Autocomplete
        inputValue={inputValue}
        disableListWrap
        clearOnEscape
        PopperComponent={(props) => (
          <Popper
            {...props}
            className={classes.searchResultWrapper}
            placement="bottom-start"
          />
        )}
        getOptionSelected={(option, value) => option.name === value.name}
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        options={placesData}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <SearchInput
            params={params}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        )}
        renderOption={(option) => <SearchResult option={option} />}
      />
    </Box>
  )
}

export default SearchBar
