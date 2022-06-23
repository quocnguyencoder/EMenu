import moment from 'moment'

const getDatesInRange = (startDate: string, endDate: string) => {
  const date = new Date(startDate)
  const end = new Date(endDate)
  const dates = []

  while (date <= end) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  const dateFormat = dates.map((date) => moment(date).format('DD-MM-yyyy'))
  return dateFormat
}

export default getDatesInRange
