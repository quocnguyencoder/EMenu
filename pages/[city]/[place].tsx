import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  CardMedia,
} from "@material-ui/core";
import { Info, SearchBar, Item, Categories } from "../../components/DetailPage";
import { Fragment, useEffect, useState } from "react";
import { prefix } from "../../constants";

export default function Place() {
  const categories = Array.from(
    new Set(menu.map((m) => m.category.toLowerCase()))
  );
  const [filterCategories, setFilterCategories] = useState(categories);
  const scroll = useScroll();

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
      <Box display="flex" mt={2} style={{ gap: "2%" }}>
        <List component="nav" style={{ minWidth: "20%", maxWidth: "20%" }}>
          <Typography variant="h4">Menu</Typography>
          {scroll > 370 ? (
            <Box
              position="fixed"
              minWidth="20%"
              maxWidth="20%"
              top={64}
              pr="24px"
            >
              <Categories filterCategories={filterCategories} />
            </Box>
          ) : (
            <Box>
              <Categories filterCategories={filterCategories} />
            </Box>
          )}
        </List>
        <Box flex="1" maxWidth="75%">
          <Typography>promotions</Typography>
          <SearchBar
            categories={categories}
            setFilterCategories={setFilterCategories}
          />
          <List id={`menu items`}>
            {filterCategories.map((category) => {
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
                    .filter((m) => m.category.toLowerCase() === category)
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
  { category: "meAt", name: "steak", description: "thịt tươi", price: 8 },
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
