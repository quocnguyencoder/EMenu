import {
  Box,
  Container,
  Chip,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlaceList from '@/components/Explore/PlaceList'
import Breakfast from 'icons/breakfast'
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

const index = () => {
  const categories = [
    { name: 'Breakfast', icon: <Breakfast /> },
    { name: 'Dessert', icon: <Desserts /> },
    { name: 'Sandwiches', icon: <Sandwiches /> },
    { name: 'Coffee', icon: <Coffee /> },
    { name: 'Burgers', icon: <Burgers /> },
    { name: 'Chicken', icon: <Chicken /> },
    { name: 'Salad', icon: <Salad /> },
    { name: 'FastFood', icon: <Fastfood /> },
    { name: 'Bakery', icon: <Bakery /> },
    { name: 'Smoothie', icon: <Smoothie /> },
    { name: 'Healthy', icon: <Healthy /> },
    { name: 'Pizza', icon: <Pizza /> },
    { name: 'Soup', icon: <Soup /> },
    { name: 'Vegan', icon: <Vegan /> },
  ]
  return (
    <Container maxWidth="md" style={{ minWidth: '80vw', minHeight: '85vh' }}>
      <Box
        padding="1rem 0%"
        display="flex"
        overflow="auto"
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
          >
            {category.icon}
            <Typography variant="caption" style={{ marginTop: '0.5rem' }}>
              {category.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        overflow="auto"
        paddingTop="1rem"
        style={{ gap: '2%' }}
      >
        <Chip
          label={
            <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                Trên 4.5 ★
              </Typography>
              <Divider orientation="vertical" flexItem />
              <IconButton style={{ padding: '0', color: 'black' }}>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          }
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
        <Chip
          label={
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              Gần bạn
            </Typography>
          }
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
        <Chip
          label={
            <Box display="flex" alignItems="center" style={{ gap: '4%' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                Giá
              </Typography>
              <IconButton style={{ padding: '0', color: 'black' }}>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          }
          clickable
          style={{
            backgroundColor: 'rgb(231, 231, 231)',
          }}
        />
      </Box>
      <PlaceList />
    </Container>
  )
}

export default index
