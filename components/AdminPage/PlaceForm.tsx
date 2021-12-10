import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from '@material-ui/core'
import { useState } from 'react'
import dvhcvn from '@/firebase/dvhcvn.json'
import { Place } from '@/models/place'
import SelectTimeOpenClose from './SelectTimeOpenClose'
import restoreAddress from '@/functions/restoreAddress'

interface Props {
  place: Place
}

const PlaceForm = ({ place }: Props) => {
  const [province, setProvince] = useState<string>(
    restoreAddress(place.address.province)
  )
  const [city, setCity] = useState<string>(restoreAddress(place.address.city))
  const [ward, setWard] = useState<string>(restoreAddress(place.address.ward))

  const handleChangeProvince = (e: React.ChangeEvent<{ value: unknown }>) => {
    setProvince(e.target.value as string)
    setCity('')
  }

  const handleChangeCity = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCity(e.target.value as string)
    setWard('')
  }

  return (
    <>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>Tên địa điểm</InputLabel>
        <OutlinedInput
          defaultValue={place.name}
          required
          multiline
          minRows={1}
          name="name"
          label="Tên địa điểm"
        />
      </FormControl>
      <Box display="flex" style={{ gap: '1%' }}>
        <Box flex={1}>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
            color="secondary"
          >
            <InputLabel>Tỉnh/Thành</InputLabel>
            <Select
              native
              defaultValue={province}
              required
              name="province"
              label="Tỉnh/Thành"
              onChange={handleChangeProvince}
            >
              <option value="" />
              {dvhcvn.map((province: any) => (
                <option
                  key={`Province/City ${province.Name}`}
                  value={province.Name}
                >
                  {province.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box flex={1}>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
            color="secondary"
          >
            <InputLabel>Quận/Huyện</InputLabel>
            <Select
              native
              defaultValue={city}
              required
              name="city"
              label="Quận/Huyện"
              onChange={handleChangeCity}
            >
              <option value="" />
              {province !== '' &&
                dvhcvn
                  .filter((Id1: any) => Id1.Name === province)[0]
                  .Districts.map((city: any) => (
                    <option
                      key={`City/District ${city.Name}`}
                      value={city.Name}
                    >
                      {city.Name}
                    </option>
                  ))}
            </Select>
          </FormControl>
        </Box>

        <Box flex={1}>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
            color="secondary"
          >
            <InputLabel>Xã/Phường</InputLabel>
            <Select
              native
              defaultValue={ward}
              required
              name="ward"
              label="Xã/Phường"
            >
              <option value="" />
              {province !== '' &&
                city !== '' &&
                dvhcvn
                  .filter((Id1: any) => Id1.Name === province)[0]
                  .Districts.filter((Id2: any) => Id2.Name === city)[0]
                  .Wards.map((ward: any) => (
                    <option key={`Ward/Town ${ward.Name}`} value={ward.Name}>
                      {ward.Name}
                    </option>
                  ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>Địa chỉ</InputLabel>
        <OutlinedInput
          defaultValue={place.address.street}
          multiline
          minRows={1}
          required
          name="street"
          label="Địa chỉ"
        />
      </FormControl>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>Số điện thoại</InputLabel>
        <OutlinedInput
          defaultValue={place.phone}
          required
          name="phone"
          label="Số điện thoại"
          inputProps={{
            pattern: '^[0-9]{10}$',
          }}
        />
      </FormControl>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>Loại hình kinh doanh</InputLabel>
        <OutlinedInput
          defaultValue={place.type}
          required
          name="type"
          label="Loại hình kinh doanh"
        />
      </FormControl>
      <Box display="flex" style={{ gap: '4%' }}>
        <Box display="flex" flex={1} style={{ gap: '1%' }}>
          <SelectTimeOpenClose
            status="Open"
            label="mở"
            time={place.time.open}
          />
        </Box>
        <Box display="flex" flex={1} style={{ gap: '1%' }}>
          <SelectTimeOpenClose
            status="Close"
            label="đóng"
            time={place.time.close}
          />
        </Box>
      </Box>
    </>
  )
}

export default PlaceForm
