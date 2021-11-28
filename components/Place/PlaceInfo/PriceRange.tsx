import { Box, Typography } from '@material-ui/core'
import { moneyFormatter } from '@/functions/index'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import { Menu } from '@/models/place'

interface Props {
  menu: Menu
}

const PriceRange = ({ menu }: Props) => {
  const menuItems = Object.keys(menu).map(Number)
  let maxPrice = moneyFormatter.format(0)
  let minPrice = moneyFormatter.format(0)
  if (menuItems.length > 0) {
    const maxItemID = menuItems.reduce((prev, curr) =>
      menu[prev].price > menu[curr].price ? prev : curr
    )

    const minItemID = menuItems.reduce((prev, curr) =>
      menu[prev].price < menu[curr].price ? prev : curr
    )

    maxPrice = moneyFormatter.format(menu[maxItemID].price)
    minPrice = moneyFormatter.format(menu[minItemID].price)
  } else {
    maxPrice = moneyFormatter.format(0)
    minPrice = moneyFormatter.format(0)
  }
  return (
    <Box display="flex" style={{ color: 'gray' }}>
      <MonetizationOnOutlinedIcon />
      <Typography variant="body1">{`${minPrice} - ${maxPrice}`}</Typography>
    </Box>
  )
}

export default PriceRange
