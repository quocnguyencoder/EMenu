import { Box, List, ListItem } from "@material-ui/core";

import Image from "next/image";

interface Props {
  setValue: any;
}

export default function Nav({ setValue }: Props) {
  const handleClick = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box ml={1} mt={1} mr={1}>
      <Image src="/logo.png" alt="logo" width={100} height={50} />
      <List component="nav">
        {categories.map((category) => (
          <ListItem key={category} button onClick={() => handleClick(category)}>
            {category}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const categories = [
  "Dashboards",
  "Profile Restaurant",
  "Staff management",
  "Maps",
];
