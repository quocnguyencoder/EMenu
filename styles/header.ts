import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  layout: {
    flex: 1,
  },
  drawerButtonIcon: {
    color: '#000000',
    fontSize: '4vh',
  },
  hideButtons: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '5px',
    },
  },
  sideBox: {
    flex: 1,
    display: 'flex',
    minWidth: '-webkit-min-content',
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
