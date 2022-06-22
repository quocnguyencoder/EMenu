import React from 'react'
import Breakfast from 'icons/Breakfast'
import Desserts from 'icons/Desserts'
import Sandwiches from 'icons/Sandwiches'
import Coffee from 'icons/Coffee'
import Burgers from 'icons/Burgers'
import Chicken from 'icons/Chicken'
import Salad from 'icons/Salad'
import Fastfood from 'icons/Fastfood'
import Bakery from 'icons/Bakery'
import Smoothie from 'icons/Smoothie'
import Healthy from 'icons/Healthy'
import Pizza from 'icons/Pizza'
import Soup from 'icons/Soup'
import Vegan from 'icons/Vegan'
import { Box, Typography } from '@material-ui/core'

interface Props {
  selectedCategory: string
  setSelectedCategory: (value: string) => void
}

const CategoryList = ({ selectedCategory, setSelectedCategory }: Props) => {
  const categories = [
    { name: 'Ăn sáng', icon: <Breakfast /> },
    { name: 'Đồ ngọt', icon: <Desserts /> },
    { name: 'Sandwiches', icon: <Sandwiches /> },
    { name: 'Cà phê', icon: <Coffee /> },
    { name: 'Burgers', icon: <Burgers /> },
    { name: 'Gà', icon: <Chicken /> },
    { name: 'Salad', icon: <Salad /> },
    { name: 'Ăn vặt', icon: <Fastfood /> },
    { name: 'Bánh mì', icon: <Bakery /> },
    { name: 'Smoothie', icon: <Smoothie /> },
    { name: 'Healthy', icon: <Healthy /> },
    { name: 'Pizza', icon: <Pizza /> },
    { name: 'Súp', icon: <Soup /> },
    { name: 'Chay', icon: <Vegan /> },
  ]

  const isSelected = (name: string) => name === selectedCategory

  return (
    <Box
      padding="1rem 0%"
      display="flex"
      overflow="scroll auto"
      style={{ gap: '3%' }}
    >
      {categories.map((category, index) => (
        <Box
          key={`${index}-${category.name}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() =>
            isSelected(category.name)
              ? setSelectedCategory('')
              : setSelectedCategory(category.name)
          }
        >
          {category.icon}
          <Typography
            variant="caption"
            style={{
              marginTop: '0.5rem',
              color: isSelected(category.name) ? 'red' : 'black',
            }}
          >
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default CategoryList
