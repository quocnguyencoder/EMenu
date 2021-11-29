import React from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListSubheader,
  Collapse,
} from '@material-ui/core'

interface Props {
  state: boolean
  filter: string
  setState: any
  setFilter: any
}

const Setting = ({ state, setState, filter, setFilter }: Props) => {
  const [openName, setOpenName] = React.useState(false)
  const [openPrice, setOpenPrice] = React.useState(false)

  const handleName = () => {
    setOpenName(!openName)
  }
  const handlePrice = () => {
    setOpenPrice(!openPrice)
  }
  const handleFilter = (input: string) => {
    setFilter(input)
  }
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setState(open)
    }
  const list = (filterBy: string) => (
    <List>
      {['Tăng dần', 'Giảm dần'].map((value) => (
        <ListItem key={`Filter by ${filterBy} ${value}`}>
          <FormControlLabel
            value={`${filterBy} ${value}`}
            control={<Radio />}
            label={value}
            checked={filter === `${filterBy} ${value}` ? true : false}
          />
        </ListItem>
      ))}
    </List>
  )

  return (
    <SwipeableDrawer
      anchor={`right`}
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <RadioGroup onChange={(e) => handleFilter(e.target.value)}>
        <List subheader={<ListSubheader component="div">E-Menu</ListSubheader>}>
          <ListItem>
            <FormControlLabel
              value="All"
              control={<Radio />}
              label="Tất cả thực đơn"
              checked={filter === 'All' ? true : false}
            />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div">Sắp xếp theo</ListSubheader>
          }
        >
          <ListItem>
            <FormControlLabel
              value="Category"
              control={<Radio />}
              label="Loại"
              checked={filter === 'Category' ? true : false}
            />
          </ListItem>
          <ListItem button onClick={handleName}>
            <ListItemText primary="Tên" />
            {openName ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openName} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>{list(`Tên`)}</ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={handlePrice}>
            <ListItemText primary="Giá" />
            {openPrice ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPrice} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>{list(`Giá`)}</ListItem>
            </List>
          </Collapse>
        </List>
      </RadioGroup>
    </SwipeableDrawer>
  )
}

export default React.memo(Setting)
