import { Box, Typography } from '@material-ui/core'
import { moneyFormatter } from '@/functions/index'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import { Menu } from '@/models/place'

interface Props {
  menu: Menu
}

const PriceRange = ({ menu }: Props) => {
  const menuItems = Object.keys(menu).map(Number)

  const maxItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price > menu[curr].price ? prev : curr
  )

  const minItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price < menu[curr].price ? prev : curr
  )

  const maxPrice = moneyFormatter.format(menu[maxItemID].price)
  const minPrice = moneyFormatter.format(menu[minItemID].price)
  return (
    <Box display="flex" style={{ color: 'gray' }}>
      <MonetizationOnOutlinedIcon />
      <Typography variant="body1">{`${minPrice} - ${maxPrice}`}</Typography>
    </Box>
  )
}

export default PriceRange
