import React from "react";
import Head from "next/head";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "../styles/layout";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{`EMenu: ${title}`}</title>
        <meta name="description" content="Welcome to EMenu" />
        <link rel="icon" href={`${prefix}/favicon.ico`} />
      </Head>

      <AppBar color="transparent" position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              EMenu
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Địa điểm, món ăn, loại hình..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </div>
  );
}
