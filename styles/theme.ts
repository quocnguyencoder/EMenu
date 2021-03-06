import { createTheme } from '@material-ui/core/styles'
// import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#D4451B',
    },
    secondary: {
      main: '#565656',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#ffffff',
    },
  },
})

export default theme
