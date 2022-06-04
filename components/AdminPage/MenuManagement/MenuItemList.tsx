import React, { useState } from 'react'
import { Place } from '../../../models/place'
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
import formatter from '@/functions/moneyFormatter'
import UpdateItem from './UpdateItem'
import DeleteMenuItem from './DeleteMenuItem'

interface Props {
  placeInfo: Place
  filter: string
}

const MenuItemList = ({ placeInfo, filter }: Props) => {
  const classes = useStyles()
  const [itemCategoryList, setItemCategoryList] = useState<number[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [modalDeleteMenuItem, setModalDeleteMenuItem] = useState(false)
  const [selectedItemID, setSelectedItemID] = useState<number>(-1)

  const handleOpenModal = (itemID: number) => {
    setOpenModal(true)
    setSelectedItemID(itemID)
    setItemCategoryList(
      Object.keys(placeInfo.categories)
        .map(Number)
        .reduce(
          (pre: number[], curr) =>
            placeInfo.categories[curr].items.includes(itemID)
              ? [...pre, curr]
              : pre,
          []
        )
    )
  }

  const handleDeleteMenuItem = (itemID: number) => {
    setModalDeleteMenuItem(true)
    setSelectedItemID(itemID)
    setItemCategoryList(
      Object.keys(placeInfo.categories)
        .map(Number)
        .reduce(
          (pre: number[], curr) =>
            placeInfo.categories[curr].items.includes(itemID)
              ? [...pre, curr]
              : pre,
          []
        )
    )
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setModalDeleteMenuItem(false)
    setSelectedItemID(-1)
  }

  const sortByFilter = (filter: string) => {
    const itemIDList = Object.keys(placeInfo.menu).map(Number)
    if (filter === 'Tên Tăng dần' || filter === 'Tên Giảm dần') {
      itemIDList.sort((a, b) =>
        placeInfo.menu[a].name > placeInfo.menu[b].name ? 1 : -1
      )
      return filter === 'Tên Tăng dần' ? itemIDList : itemIDList.reverse()
    } else if (filter === 'All') return itemIDList
    else {
      itemIDList.sort(
        (a, b) => placeInfo.menu[a].price - placeInfo.menu[b].price
      )
      return filter === 'Giá Tăng dần' ? itemIDList : itemIDList.reverse()
    }
  }

  return (
    <>
      <ImageList gap={10} style={{ width: '100%', gap: '3%', margin: '0' }}>
        {sortByFilter(filter).map((itemID) => (
          <Box
            key={`menuItem-name-${placeInfo.menu[itemID].name}-index-${itemID}`}
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
                image={`${placeInfo.menu[itemID].image}`}
                title={`${placeInfo.menu[itemID].name}`}
                style={{ objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={placeInfo.menu[itemID].name}
                subtitle={
                  <Box>
                    <Typography
                      variant="body2"
                      className={classes.noOverFlowText}
                    >
                      Mô tả: {placeInfo.menu[itemID].description}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.noOverFlowText}
                    >
                      Giá: {formatter.format(placeInfo.menu[itemID].price)}
                    </Typography>
                  </Box>
                }
                actionIcon={
                  <IconButton
                    onClick={() => handleDeleteMenuItem(itemID)}
                    title={`Xóa ${placeInfo.menu[itemID].name}`}
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
          categories={placeInfo.categories}
          itemID={selectedItemID}
          itemInfo={placeInfo.menu[selectedItemID]}
          itemCategoryList={itemCategoryList}
          placeID={placeInfo.id}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          setItemCategoryList={setItemCategoryList}
        />
      )}
      {modalDeleteMenuItem == true && (
        <DeleteMenuItem
          menu={placeInfo.menu}
          categories={placeInfo.categories}
          placeID={placeInfo.id}
          itemID={selectedItemID}
          itemCategoryList={itemCategoryList}
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
