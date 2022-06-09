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

interface Location {
  street: string
  ward: string
  city: string
  slug: string
}

interface Highlight {
  text: string
  highlight: boolean
}

const AddressInput = () => {
  const classes = useStyles()
  const location: Location[] = [
    {
      street: '54A Nguyễn Chí Thanh',
      ward: 'Phường Láng Thượng, Quận Đống Đa',
      city: 'Hà Nội',
      slug: 'ha-noi',
    },
    {
      street: 'T 1, Toà 170 La Thành',
      ward: 'P. Ô Chợ Dừa, Q. Đống Đa',
      city: 'Hà Nội',
      slug: 'ha-noi',
    },
    {
      street: '29 Liễu Giai',
      ward: 'P. Ngọc Khánh, Q. Ba Đình',
      city: 'Hà Nội',
      slug: 'ha-noi',
    },
    {
      street: '46 Thanh Nhàn',
      ward: 'Hai Bà Trưng',
      city: 'Hà Nội',
      slug: 'ha-noi',
    },
    {
      street: '131 Nguyễn Văn Cừ',
      ward: 'Phường Ngọc Lâm, Quận Long Biên',
      city: 'Hà Nội',
      slug: 'ha-noi',
    },
    {
      street: '101 Huỳnh Thúc Kháng',
      ward: 'P.Tân Lập',
      city: 'Nha Trang',
      slug: 'nha-trang',
    },
    {
      street: '09 Pasteur',
      ward: 'P. Xương Huân',
      city: 'Nha Trang',
      slug: 'nha-trang',
    },
    {
      street: '166 Nguyễn Thái Học',
      ward: 'P.Tân Lập',
      city: 'Nha Trang',
      slug: 'nha-trang',
    },
    {
      street: '1/6 Võ Thị Sáu',
      ward: 'P.Vĩnh Trường',
      city: 'Nha Trang',
      slug: 'nha-trang',
    },
    {
      street: '18 Hai Bà Trưng ',
      ward: 'Phường Bến Nghé, Quận 1',
      city: 'TP Hồ Chí Minh',
      slug: 'tp-ho-chi-minh',
    },
    {
      street: '114 Trần Đình Xu',
      ward: 'Phường Nguyễn Cư Trinh, Quận 1',
      city: 'TP Hồ Chí Minh',
      slug: 'tp-ho-chi-minh',
    },
    {
      street: '424 Nguyễn Thị Minh Khai',
      ward: 'Phường 5, Quận 3',
      city: 'TP Hồ Chí Minh',
      slug: 'tp-ho-chi-minh',
    },
    {
      street: '226 Cách Mạng Tháng 8',
      ward: 'Phường 10, Quận 3',
      city: 'TP Hồ Chí Minh',
      slug: 'tp-ho-chi-minh',
    },
  ]

  const [searchValue, setSearchValue] = useState<Location | null>(null)
  const [inputValue, setInputValue] = useState('')

  return (
    <Paper component={'form'} className={classes.addressInputContainer}>
      <Autocomplete
        style={{ width: '100%' }}
        disableListWrap
        selectOnFocus
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
                onClick={() =>
                  searchValue &&
                  router.push(ROUTES.EXPLORE_LOCATION(searchValue.slug))
                }
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
