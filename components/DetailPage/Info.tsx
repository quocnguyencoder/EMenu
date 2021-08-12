import { Box, Typography, Breadcrumbs } from "@material-ui/core";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import { useRouter } from "next/router";
import Rate from "./Rate";
import Link from "next/link";

export default function Info() {
  const router = useRouter();
  const price = "10b";
  return (
    <Box maxWidth="60%" style={{ flexDirection: "column" }}>
      <Breadcrumbs separator="››" aria-label="breadcrumb">
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        <Link as={`/${router.query.city}`} href="/[city]">
          <a>{router.query.city}</a>
        </Link>
        <Link
          as={`/${router.query.city}/${router.query.place}`}
          href="/[city]/[place]"
        >
          <a>{router.query.place}</a>
        </Link>
      </Breadcrumbs>
      <Typography>
        Shop/Cua Hang/Quan An -{" "}
        <Link as="/" href="/">
          <a>Chi nhanh</a>
        </Link>
      </Typography>

      <Typography variant="h4">{router.query.place}</Typography>
      <Typography variant="body2">Dia Chi</Typography>

      <Rate />

      <Typography variant="body1">Closed</Typography>
      <Typography>
        <MonetizationOnOutlinedIcon />
        {price}
      </Typography>
    </Box>
  );
}
