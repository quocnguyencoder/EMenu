import { Box, Typography, Container, List, ListItem } from "@material-ui/core";
import SearchBar from "../../components/DetailPage/SearchBar";
import Image from "next/image";
import Info from "../../components/DetailPage/Info";
import * as React from "react";

export default function Place() {
  const categories = Array.from(new Set(menu.map((m) => m.category)));
  return (
    <Container maxWidth="lg">
      <Box display="flex" mt={1} style={{ gap: "1%" }}>
        <Image src="../chicken.jpg" alt="food" width={480} height={300} />
        <Info />
      </Box>
      <Box display="flex" mt={2} style={{ gap: "2%" }}>
        <List component="nav">
          <Typography variant="h4">Menu</Typography>
          {categories.map((category) => (
            <ListItem key={category} button>
              {category}
            </ListItem>
          ))}
        </List>
        <Box flex="1">
          <Typography>promotions</Typography>
          <SearchBar />
          <List>
            {categories.map((category) => {
              return (
                <React.Fragment key={`menu ${category}`}>
                  <Typography>{category}</Typography>
                  {menu
                    .filter((m) => m.category === category)
                    .map((n) => (
                      <ListItem key={n.name} button>
                        {n.name}
                      </ListItem>
                    ))}
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
