import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  disableHoverEffect: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  link: {
    cursor: 'pointer',
    maxWidth: '17rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
