import { FormControl, InputLabel, Select } from '@material-ui/core'
import moment from 'moment'

interface Props {
  status: string
  time: string
}

const SelectTimeOpenClose = ({ status, time }: Props) => {
  const hours: string[] = []
  const minutes: string[] = []

  for (let i = 0; i < 12; i++) {
    if (i < 10) hours.push(`0${i}`)
    else hours.push(`${i}`)
  }

  for (let i = 0; i < 60; i++) {
    if (i < 10) minutes.push(`0${i}`)
    else minutes.push(`${i}`)
  }

  return (
    <>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>{status} Hour</InputLabel>
        <Select
          native
          defaultValue={moment(time, 'hh:mm A').format('hh')}
          required
          name={`${status}Hour`}
          label={`${status} Hour`}
        >
          {hours.map((hour) => (
            <option key={`hour-${hour}`} value={`${hour}`}>
              {hour}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>{status} Minute</InputLabel>
        <Select
          native
          defaultValue={moment(time, 'hh:mm A').format('mm')}
          required
          name={`${status}Minute`}
          label={`${status} Minute`}
        >
          {minutes.map((minute) => (
            <option key={`minute-${minute}`} value={`${minute}`}>
              {minute}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        margin="dense"
        variant="outlined"
        color="secondary"
      >
        <InputLabel>Periods</InputLabel>
        <Select
          native
          defaultValue={moment(time, 'hh:mm A').format('A')}
          required
          name={`${status}Period`}
          label="Periods"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </Select>
      </FormControl>
    </>
  )
}

export default SelectTimeOpenClose
