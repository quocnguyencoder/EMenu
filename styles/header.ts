import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  layout: {
    flex: 1,
  },
  title: {
    flexGrow: 0.05,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 0,
    flexGrow: 0.5,
  },
  searchIcon: {
    color: 'gray',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    width: '100%',
  },
}))
