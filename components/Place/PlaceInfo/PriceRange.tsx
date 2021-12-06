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

  const maxPrice = moneyFormatter.format(
    isEmptyMenu
      ? 0
      : menuItems.reduce((prev, curr) =>
          menu[prev].price > menu[curr].price
            ? menu[prev].price
            : menu[curr].price
        )
  )

  const minPrice = moneyFormatter.format(
    isEmptyMenu
      ? 0
      : menuItems.reduce((prev, curr) =>
          menu[prev].price < menu[curr].price
            ? menu[prev].price
            : menu[curr].price
        )
  )

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
