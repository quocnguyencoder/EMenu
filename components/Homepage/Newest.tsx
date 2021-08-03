import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

const Newest = () => {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Card>
          <CardActionArea>
            <CardMedia
              style={{ height: 150 }}
              image={`${prefix}/food.jpg`}
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <ListItem>
            <ListItemText
              primary={
                <Link
                  href="#"
                  onClick={preventDefault}
                  color="inherit"
                  variant="body1"
                  style={{ fontWeight: "bold" }}
                >
                  Quán net Ông Tiến
                </Link>
              }
              secondary={
                <Typography variant="body2">
                  22 Hoàng Văn Thụ, Nha Trang, Khánh Hòa
                </Typography>
              }
            />
          </ListItem>

          <CardHeader
            avatar={<Avatar aria-label="recipe">Q</Avatar>}
            title={
              <Link
                href="#"
                onClick={preventDefault}
                color="inherit"
                variant="body2"
                style={{ fontWeight: "bold" }}
              >
                Quoc Nguyen
              </Link>
            }
            subheader="This place is awesome :)"
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Newest;
