import { Box, Typography } from '@material-ui/core'
import { moneyFormatter } from '@/functions/index'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import { Menu } from '@/models/place'

interface Props {
  menu: Menu
}

const PriceRange = ({ menu }: Props) => {
  const menuItems = Object.keys(menu).map(Number)

  const isEmptyMenu = menuItems.length === 0
  const pricesArr = isEmptyMenu
    ? [0]
    : menuItems.map((itemID) => menu[itemID].price)

  const maxPrice = moneyFormatter.format(Math.max(...pricesArr))

  const minPrice = moneyFormatter.format(Math.min(...pricesArr))

  return (
    <Box display="flex" style={{ color: 'gray' }}>
      <MonetizationOnOutlinedIcon />
      {isEmptyMenu ? (
        <Typography variant="body1">{`${minPrice}`}</Typography>
      ) : (
        <Typography variant="body1">{`${minPrice} - ${maxPrice}`}</Typography>
      )}
    </Box>
  )
}

export default PriceRange
