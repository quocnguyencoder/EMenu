import {
  ButtonBase,
  Grid,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { useStyles } from '@/styles/hero'
import { Autocomplete } from '@material-ui/lab'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { useState } from 'react'
import router from 'next/router'
import * as ROUTES from '@/constants/routes'
import { addresses } from '@/constants/mockAddresses'
import { Address } from '@/models/address'

interface Highlight {
  text: string
  highlight: boolean
}

const AddressInput = () => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState<Address | null>(null)
  const [inputValue, setInputValue] = useState('')

  return (
    <Paper component={'form'} className={classes.addressInputContainer}>
      <Autocomplete
        style={{ width: '100%' }}
        disableListWrap
        selectOnFocus
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        options={addresses}
        getOptionLabel={(option) =>
          `${option.street}, ${option.ward}, ${option.city}`
        }
        onChange={(event, newSearchValue: Address | null) => {
          setSearchValue(newSearchValue)
        }}
        getOptionSelected={(option, value) =>
          option.street === value.street && option.ward === value.ward
        }
        value={searchValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        renderOption={(option) => {
          const optionFullText = `${option.street}, ${option.ward}, ${option.city}`
          const matches = match(optionFullText, inputValue)
          const parts: Highlight[] = parse(optionFullText, matches)

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={`${index}`}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {`${part.text}`}
                  </span>
                ))}
              </Grid>
            </Grid>
          )
        }}
        renderInput={(params) => (
          <InputBase
            placeholder="Nhập vị trí hiện tại"
            startAdornment={
              <LocationOnOutlinedIcon style={{ margin: '10px' }} />
            }
            endAdornment={
              <ButtonBase
                className={classes.searchButton}
                onClick={() => {
                  if (searchValue) {
                    sessionStorage.setItem(
                      'currentAddress',
                      JSON.stringify(searchValue)
                    )
                    router.push(ROUTES.EXPLORE_LOCATION(searchValue.slug))
                  }
                }}
              >
                <Typography variant="body2" className={classes.buttonFullText}>
                  {'Khám phá khu vực'}
                </Typography>
                <Typography variant="body2" className={classes.buttonText}>
                  {'Khám phá'}
                </Typography>
              </ButtonBase>
            }
            className={classes.addressInput}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
          />
        )}
      />
    </Paper>
  )
}

export default AddressInput
