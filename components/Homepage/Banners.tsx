import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardMedia } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { prefix } from "../../constants";

function Item(props: any) {
  return (
    <Card
      style={{
        backgroundColor: "#e7e7e7",
      }}
    >
      <Container maxWidth="lg">
        <CardActionArea>
          <CardMedia
            component="img"
            height="300vh"
            image={props.item.image}
            title="Contemplative Reptile"
          />
        </CardActionArea>
      </Container>
    </Card>
  );
}

const Banners = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: `${prefix}/banner3.jpg`,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: `${prefix}/banner4.jpg`,
    },
  ];
  return (
    <Carousel indicators={false} navButtonsAlwaysInvisible={true}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default Banners;
