import React, { useState } from 'react'
import { Category, Menu, MenuItem } from '../../../models/place'
import {
  Box,
  CardMedia,
  Typography,
  ImageListItem,
  ImageListItemBar,
  makeStyles,
  ImageList,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import formatter from '../../../functions/moneyFormatter'
import UpdateItem from './UpdateItem'
import DeleteMenuItem from './DeleteMenuItem'
interface Props {
  placeID: string
  categories: Category
  menu: Menu
  itemIDList: number[]
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
  deleteMenuItem: (newMenu: Menu, categories: Category) => void
}

const MenuItemList = ({
  placeID,
  categories,
  menu,
  itemIDList,
  updateMenu,
  deleteMenuItem,
}: Props) => {
  const classes = useStyles()
  const [itemCategoryList, setItemCategoryList] = useState<number[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [modalDeleteMenuItem, setModalDeleteMenuItem] = useState(false)
  const [selectedItemID, setSelectedItemID] = useState<number>(-1)

  const handleOpenModal = (itemID: number) => {
    setOpenModal(true)
    setSelectedItemID(itemID)
    setItemCategoryList(
      Object.keys(categories)
        .map(Number)
        .reduce(
          (pre: number[], curr) =>
            categories[curr].items.includes(itemID) ? [...pre, curr] : pre,
          []
        )
    )
  }

  const handleDeleteMenuItem = (itemID: number) => {
    setModalDeleteMenuItem(true)
    setSelectedItemID(itemID)
    setItemCategoryList(
      Object.keys(categories)
        .map(Number)
        .reduce(
          (pre: number[], curr) =>
            categories[curr].items.includes(itemID) ? [...pre, curr] : pre,
          []
        )
    )
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setModalDeleteMenuItem(false)
    setSelectedItemID(-1)
  }

  return (
    <>
      <ImageList gap={10} style={{ width: '100%', gap: '3%', margin: '0' }}>
        {itemIDList.map((itemID) => (
          <Box
            key={`menuItem-name-${menu[itemID].name}-index-${itemID}`}
            mb={1}
            style={{
              width: '20%',
              height: '20%',
              background:
                'linear-gradient(rgb(5 159 137), transparent) #D14B28',
              backgroundColor: '#D14B28',
            }}
          >
            <ImageListItem cols={4}>
              <CardMedia
                component="img"
                onClick={() => handleOpenModal(itemID)}
                image={`${menu[itemID].image}`}
                title={`${menu[itemID].name}`}
                style={{ objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={menu[itemID].name}
                subtitle={
                  <Box>
                    <Typography
                      variant="body2"
                      className={classes.noOverFlowText}
                    >
                      Mô tả: {menu[itemID].description}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.noOverFlowText}
                    >
                      Giá: {formatter.format(menu[itemID].price)}
                    </Typography>
                  </Box>
                }
                actionIcon={
                  <IconButton
                    onClick={() => handleDeleteMenuItem(itemID)}
                    title={`Xóa ${menu[itemID].name}`}
                    style={{ color: 'red' }}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
            </ImageListItem>
          </Box>
        ))}
      </ImageList>
      {openModal == true && (
        <UpdateItem
          categories={categories}
          itemID={selectedItemID}
          itemInfo={menu[selectedItemID]}
          itemCategoryList={itemCategoryList}
          placeID={placeID}
          updateMenu={updateMenu}
          setItemCategoryList={setItemCategoryList}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalDeleteMenuItem == true && (
        <DeleteMenuItem
          categories={categories}
          menu={menu}
          itemID={selectedItemID}
          itemCategoryList={itemCategoryList}
          placeID={placeID}
          deleteMenuItem={deleteMenuItem}
          modalDeleteMenuItem={modalDeleteMenuItem}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}

export default MenuItemList

const useStyles = makeStyles(() => ({
  noOverFlowText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
