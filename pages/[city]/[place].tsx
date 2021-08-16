import React from "react";
import { Box, Typography, Container, List, ListItem } from "@material-ui/core";
// import SearchBar from "../../components/DetailPage/SearchBar";
import Info from "../../components/DetailPage/Info";
import { prefix } from "../../constants";
import { CardMedia } from "@material-ui/core";

export default function Place() {
  const categories = Array.from(new Set(menu.map((m) => m.category)));
  return (
    <Container maxWidth="lg">
      <Box display="flex" mt={1} style={{ gap: "1%" }}>
        <CardMedia
          component="img"
          image={`${prefix}/chicken.jpg`}
          title="img"
          height={300}
          style={{ maxWidth: "50vw" }}
        />

        <Info />
      </Box>
      <Box display="flex" mt={2} style={{ gap: "1%" }}>
        <List component="nav">
          <Typography variant="h4">Menu</Typography>
          {categories.map((category) => (
            <ListItem key={`menu${category}`} button>
              {category}
            </ListItem>
          ))}
        </List>
        <Box flex="1">
          <Typography>promotions</Typography>
          {/* <SearchBar /> */}
          {/* <List>
            {categories.map((category) =>
              menu
                .filter((item) => item.category === category)
                .map((m) => (
                  <ListItem key={m.name} button>
                    {m.name}
                  </ListItem>
                ))
            )}
          </List> */}
          <List>
            {categories.map((category) => {
              return (
                <React.Fragment key={`list${category}`}>
                  <Typography>{category}</Typography>
                  {menu.map((m) =>
                    m.category === category ? (
                      <ListItem key={m.name} button>
                        {m.name}
                      </ListItem>
                    ) : (
                      <></>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

const menu = [
  {
    category: "meatttttttttttttttttttttttttttttttttttttttttt",
    name: "beef",
    price: "7$",
  },
  { category: "meat", name: "steak", price: "8$" },
  { category: "meat", name: "goat", price: "9$" },
  { category: "fruit", name: "apple", price: "10$" },
  { category: "fruit", name: "weed", price: "11$" },
  { category: "cake", name: "pipe", price: "12$" },
];
