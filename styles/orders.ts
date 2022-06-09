import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  statusText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '5rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',
    },
  },
  avatarWrapper: {
    width: '20%',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      height: '10rem',
      width: '100%',
    },
  },
}))
