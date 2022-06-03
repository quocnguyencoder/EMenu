import { useEffect, useState } from 'react'
import { useStyles } from '@/styles/header'
import { Box, Popper, Typography } from '@material-ui/core'
import * as getService from '@/firebase/getDocument'
import { Place } from '@/models/place'
import { Autocomplete } from '@material-ui/lab'
import { useRouter } from 'next/router'
import * as ROUTES from '@/constants/routes'
import SearchResult from './SearchResult'
import SearchInput from './SearchInput'

const SearchBar = () => {
  const router = useRouter()
  const classes = useStyles()
  const [placesData, setPlaceData] = useState<Place[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getService.default.getAllPlaces().then((data) => setPlaceData(data))
  }, [])

  const goToDetail = (placeData: Place | null) => {
    placeData !== null && router.push(ROUTES.PLACE_DETAIL(placeData.id))
  }

  return (
    <Box className={classes.search}>
      <Autocomplete
        inputValue={inputValue}
        disableListWrap
        PopperComponent={(props) => (
          <Popper
            {...props}
            className={classes.searchResultWrapper}
            placement="bottom-start"
          />
        )}
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        options={placesData}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => goToDetail(value)}
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
