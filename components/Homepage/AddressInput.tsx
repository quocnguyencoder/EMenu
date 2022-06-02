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

interface Location {
  street: string
  ward: string
  city: string
}

interface Highlight {
  text: string
  highlight: boolean
}

const AddressInput = () => {
  const classes = useStyles()
  const location: Location[] = [
    { street: '344 Dykes Ln', ward: 'La Follette', city: 'Tennessee(TN)' },
    { street: '601 Eagle Blvd', ward: 'Shelbyville', city: 'Tennessee(TN)' },
    { street: '2327 Towery Trl', ward: 'Lutz', city: 'Florida(FL)' },
    { street: '931 10th Ave N', ward: 'Glasgow', city: 'Montana(MT)' },
  ]

  const [searchValue, setSearchValue] = useState<Location | null>(null)
  const [inputValue, setInputValue] = useState('')

  return (
    <Paper component={'form'} className={classes.addressInputContainer}>
      <Autocomplete
        style={{ width: '100%' }}
        disableListWrap
        selectOnFocus
        clearOnBlur
        noOptionsText={<Typography>{'Không tìm thấy kết quả'}</Typography>}
        options={location}
        getOptionLabel={(option) =>
          `${option.street}, ${option.ward}, ${option.city}`
        }
        onChange={(event, newSearchValue: Location | null) => {
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
                onClick={() => router.push('/ho-chi-minh')}
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
