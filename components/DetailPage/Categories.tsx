import { ListItem, Typography } from "@material-ui/core";

interface Props {
  filterCategories: string[];
}

export default function Categories({ filterCategories }: Props) {
  return (
    <>
      {filterCategories.map((category) => (
        <ListItem key={category} button onClick={() => setScrollTo(category)}>
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
    </>
  );
}
function setScrollTo(id: string) {
  var element = document.getElementById(`${id}`);
  var menuItems = document.getElementById(`menu items`)?.offsetTop;
  var headerHeight = document.querySelector("header")?.offsetHeight;
  const scrollToSection = menuItems! + element!.offsetTop - headerHeight!;
  window.scrollTo({ top: scrollToSection, behavior: "smooth" });
}
