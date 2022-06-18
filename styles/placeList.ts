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
  cardWrapper: {
    minWidth: '20rem',
    maxWidth: '25rem',
    height: '14rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  cardImage: {
    maxHeight: '10rem !important',
    borderRadius: '5px',
  },
}))
