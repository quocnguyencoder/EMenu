import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  mainContentWrapper: {
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  reviewPostsWrapper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  ratingChart: {
    flexDirection: 'row',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
    },
  },
  divider: {
    display: 'block',
    margin: '0.5rem 0',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  headerText: {
    fontWeight: 'bold',
    margin: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      maxWidth: '85%',
      margin: '0.2rem 0',
    },
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))
