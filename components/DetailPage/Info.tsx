import { Box, Typography, Breadcrumbs } from "@material-ui/core";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import { useRouter } from "next/router";
import Rate from "./Rate";
import Link from "next/link";

export default function Info() {
  const router = useRouter();
  const price = "100.000 VNĐ";
  const address = "22 Hoàng Văn Thụ, Nha Trang, Khánh Hòa";
  const { city, place } = router.query;
  return (
    <Box maxWidth="60%">
      <Breadcrumbs separator="››" aria-label="breadcrumb">
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        <Link as={`/${city}`} href="/[city]">
          <a>{city}</a>
        </Link>
        <Link as={`/${city}/${place}`} href="/[city]/[place]">
          <a>{place}</a>
        </Link>
      </Breadcrumbs>
      <Typography>
        Shop/Cua Hang/Quan An -{" "}
        <Link as="/" href="/">
          <a>Chi nhanh</a>
        </Link>
      </Typography>

      <Typography variant="h4">{place}</Typography>
      <Typography variant="body2">{address}</Typography>

      <Rate />

      <Typography variant="body1">Closed</Typography>
      <Typography>
        <MonetizationOnOutlinedIcon />
        {price}
      </Typography>
    </Box>
  );
}
