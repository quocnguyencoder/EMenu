import { Box, Typography, Breadcrumbs, Link } from "@material-ui/core";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import { useRouter } from "next/router";
import Rate from "./Rate";

export default function Info() {
  const router = useRouter();
  const cityName = router.query.city || "none";
  const placeName = router.query.place || "none";
  return (
    <Box maxWidth="60%" display="flex" flexDirection="column">
      <Breadcrumbs separator="››" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href={`/${router.query.city}`}>
          {cityName}
        </Link>
        <Link
          color="inherit"
          href={`/${router.query.city}/${router.query.place}`}
        >
          {placeName}
        </Link>
      </Breadcrumbs>
      <Typography>
        Shop/Cua Hang/Quan An - <Link href="/">Chi nhanh</Link>
      </Typography>

      <Typography variant="h4">{router.query.place}</Typography>
      <Typography variant="body2">Dia Chi</Typography>

      <Rate />

      <Typography variant="body1">Closed</Typography>
      <Typography>
        <MonetizationOnOutlinedIcon />
        100.000đ
      </Typography>
    </Box>
  );
}
