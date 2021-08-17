import React from "react";
import { Typography, Box } from "@material-ui/core";
import Image from "next/image";

interface Props {
  name: string;
  description: string;
  price: number;
}
export default function Item({ name, description, price }: Props) {
  return (
    <Box display="flex">
      <Box maxWidth={60} mr={2}>
        <Image
          src="../chicken.jpg"
          alt="food"
          width={60}
          height={60}
          objectFit="scale-down"
        />
      </Box>
      <Box maxWidth="80%" mr={2}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
      <Box position="absolute" right={0}>
        <Typography>
          {price
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          $
        </Typography>
      </Box>
    </Box>
  );
}
