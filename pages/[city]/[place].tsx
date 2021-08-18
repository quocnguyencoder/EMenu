import { Box, Typography, Container, List, ListItem } from "@material-ui/core";
import Image from "next/image";
import { Info, SearchBar, Item } from "../../components/DetailPage";
import { Fragment, useEffect, useState } from "react";

export default function Place() {
  const categories = Array.from(new Set(menu.map((m) => m.category)));
  const scroll = useScroll();

  const handleOnClick = (input: string) => (location.hash = `${input}`);

  return (
    <Container maxWidth="lg">
      <Box display="flex" mt={1} style={{ gap: "1%" }}>
        <Image src="../chicken.jpg" alt="food" width={480} height={300} />
        <Info />
      </Box>
      <Box display="flex" mt={2} style={{ gap: "2%" }}>
        <List component="nav" style={{ minWidth: "20%", maxWidth: "20%" }}>
          <Typography variant="h4">Menu</Typography>
          {scroll > 370 ? (
            <Box position="fixed" maxWidth="20%" top={0} pr="24px">
              {categories.map((category) => (
                <ListItem
                  key={category}
                  button
                  onClick={() => handleOnClick(category)}
                >
                  <Typography
                    variant="body2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textTransform: "uppercase",
                    }}
                  >
                    {category}
                  </Typography>
                </ListItem>
              ))}
            </Box>
          ) : (
            <Box>
              {categories.map((category) => (
                <ListItem
                  key={category}
                  button
                  onClick={() => handleOnClick(category)}
                >
                  <Typography
                    variant="body2"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textTransform: "uppercase",
                    }}
                  >
                    {category}
                  </Typography>
                </ListItem>
              ))}
            </Box>
          )}
        </List>
        <Box flex="1" maxWidth="75%">
          <Typography>promotions</Typography>
          <SearchBar />
          <List>
            {categories.map((category) => {
              return (
                <Fragment key={`menu ${category}`}>
                  <Typography
                    id={`${category}`}
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textTransform: "uppercase",
                    }}
                  >
                    {category}
                  </Typography>
                  {menu
                    .filter((m) => m.category === category)
                    .map((item) => (
                      <ListItem key={item.name} button>
                        <Item
                          name={item.name}
                          description={item.description}
                          price={item.price}
                        />
                      </ListItem>
                    ))}
                </Fragment>
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
    category: "meatttttttttttttttttttttttttttttttttttt",
    name: "beef",
    description:
      "thịt tươi ngon hơn khi dùng lạnh, nướng lên làm mồi thì ngon hết sảy",
    price: 100000000,
  },
  { category: "meat", name: "steak", description: "thịt tươi", price: 8 },
  { category: "meat", name: "goat", description: "thịt tươi", price: 9 },
  {
    category: "fruit",
    name: "apple",
    description: "trái cây tươi",
    price: 10,
  },
  {
    category: "fruit",
    name: "weed",
    description: "mới hái còn thơm",
    price: 11,
  },
  { category: "cake", name: "pipe", description: "bánh ngon", price: 12 },
];

function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
}
