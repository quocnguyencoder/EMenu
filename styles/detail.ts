import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  description: {
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  chip: {
    backgroundColor: 'rgb(231, 231, 231)',
    '&:hover': {
      backgroundColor: 'rgb(200, 200, 200)',
    },
  },
  infoWrapper: {
    padding: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '0.1rem 1rem',
    },
  },
  coverImg: {
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0',
    },
  },
  topReviewsWrapper: {
    padding: '0.5rem 0',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 1rem',
    },
  },
}))
