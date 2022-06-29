import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    width: '20rem',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
  },
  disableHoverEffect: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  applyFilterButton: {
    '&:hover': {
      backgroundColor: '#D4451B',
    },
  },
}))
