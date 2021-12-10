import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Card, CardMedia } from '@material-ui/core'
import { CardActionArea } from '@material-ui/core'
import { Container } from '@material-ui/core'

function Item(props: any) {
  return (
    <Card
      style={{
        backgroundColor: '#e7e7e7',
      }}
    >
      <Container maxWidth="lg">
        <CardActionArea>
          <CardMedia component="img" height="300vh" image={props.item.image} />
        </CardActionArea>
      </Container>
    </Card>
  )
}

const Banners = () => {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      image: `https://elements-cover-images-0.imgix.net/d1f8c3e0-bba1-49e4-9178-1ff353df2f54?auto=compress%2Cformat&fit=max&w=2038&s=b23deb186944b73d7c92b51c88c9c601`,
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      image: `https://elements-cover-images-0.imgix.net/ca20d885-8c2e-44f9-9b92-a26dad00acbd?auto=compress%2Cformat&fit=max&w=2038&s=349737977dadfa089b0b22feaf94f775`,
    },
  ]
  return (
    <Carousel indicators={false} navButtonsAlwaysInvisible={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  )
}

export default Banners
