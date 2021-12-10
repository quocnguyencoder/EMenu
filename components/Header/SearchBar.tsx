import { useEffect, useState } from 'react'
import { useStyles } from '../../styles/header'
import { Typography } from '@material-ui/core'
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

  useEffect(() => {
    getService.default.getAllPlaces().then((data) => setPlaceData(data))
  }, [])

  const goToDetail = (placeData: Place | null) => {
    placeData !== null &&
      router.push(ROUTES.PLACE_DETAIL(placeData.address.province, placeData.id))
  }

  return (
    <div className={classes.search}>
      <Autocomplete
        style={{ width: '100%' }}
        disableListWrap
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        disablePortal
        options={placesData}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => goToDetail(value)}
        renderInput={(params) => <SearchInput params={params} />}
        renderOption={(option) => <SearchResult option={option} />}
      />
    </div>
  )
}

export default SearchBar
