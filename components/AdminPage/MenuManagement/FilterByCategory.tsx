import { Box, Typography, ImageList, ImageListItem } from '@material-ui/core'
import { useState } from 'react'
import { Category, Menu, MenuItem } from '../../../models/place'
import Item from './Item'
import UpdateItem from './UpdateItem'
import RemoveItemFromCategory from './RemoveItemFromCategory'

interface Props {
  categories: Category
  menu: Menu
  placeID: string
  updateMenu: (
    index: number,
    item: MenuItem,
    updateCategories: Category
  ) => void
}

export default function FilterByCategory({
  categories,
  menu,
  placeID,
  updateMenu,
}: Props) {
  const categoryList = Object.keys(categories).map(Number)
  const [openModalRemove, setOpenModalRemove] = useState(false)
  const [selectedItemID, setSelectedItemID] = useState<number>(-1)
  const [selectedCategoryID, setSelectedCategoryID] = useState<number>(-1)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [itemCategoryList, setItemCategoryList] = useState<number[]>([])

  const handleOpenModalUpdate = (itemID: number) => {
    setOpenModalUpdate(true)
    setSelectedItemID(itemID)
    setItemCategoryList(
      categoryList.reduce(
        (pre: number[], curr) =>
          categories[curr].items.includes(itemID) ? [...pre, curr] : pre,
        []
      )
    )
  }
  const handleCloseModal = () => {
    setOpenModalUpdate(false)
    setOpenModalRemove(false)
    setSelectedItemID(-1)
    setSelectedCategoryID(-1)
  }

  const handleOpenModalRemove = (itemID: number, categoryID: number) => {
    setOpenModalRemove(true)
    setSelectedItemID(itemID)
    setSelectedCategoryID(categoryID)
  }

  return (
    <>
      {categoryList.map((categoryID) => (
        <ImageList
          key={`menu subheader ${categoryID}`}
          gap={10}
          style={{ width: '100%', gap: '3%', margin: '0%' }}
        >
          <ImageListItem cols={2} style={{ height: 'auto' }}>
            <Typography
              variant="h5"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'uppercase',
              }}
            >
              {categories[categoryID].name}
            </Typography>
          </ImageListItem>
          {categories[categoryID].items.map((itemID) => (
            <Box
              key={`category-${categoryID}-menuItem-${itemID}`}
              style={{
                width: '20%',
                height: '20%',
                background:
                  'linear-gradient(rgb(5 159 137), transparent) #D14B28',
                backgroundColor: '#D14B28',
              }}
            >
              <Item
                categories={categories}
                categoryID={categoryID}
                itemID={itemID}
                itemInfo={menu[itemID]}
                handleOpenModalUpdate={handleOpenModalUpdate}
                handleOpenModalRemove={handleOpenModalRemove}
              />
            </Box>
          ))}
        </ImageList>
      ))}

      {openModalUpdate == true && (
        <UpdateItem
          categories={categories}
          itemID={selectedItemID}
          itemInfo={menu[selectedItemID]}
          itemCategoryList={itemCategoryList}
          placeID={placeID}
          updateMenu={updateMenu}
          setItemCategoryList={setItemCategoryList}
          openModal={openModalUpdate}
          handleCloseModal={handleCloseModal}
        />
      )}

      {openModalRemove == true && (
        <RemoveItemFromCategory
          categories={categories}
          categoryID={selectedCategoryID}
          itemID={selectedItemID}
          itemInfo={menu[selectedItemID]}
          placeID={placeID}
          updateMenu={updateMenu}
          openModalRemove={openModalRemove}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
