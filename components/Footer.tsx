import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

export default function Footer() {
  return (
    <AppBar position="static" color="transparent" style={{ boxShadow: 'none' }}>
      <Container
        maxWidth="md"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2021 EMenu
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
