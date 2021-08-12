import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Image from "next/image";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "../styles/header";
import { Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <AppBar color="primary" position="fixed" style={{ marginBottom: "80px" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={classes.title}>
              <Link href="/">
                <Image src="../logo.png" alt="logo" width={100} height={50} />
              </Link>
            </Box>

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
            <Button color="inherit">
              <Link color="secondary" href="/login">
                Đăng nhập
              </Link>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
